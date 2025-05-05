const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { check, validationResult } = require("express-validator");

const {
    findOneBrandByPhoneOrEmail,
    findOneBrandById,
} = require("../../salesforce/brand/findOneBrand.js");
const { createBrand } = require("../../salesforce/brand/createBrand.js");
const authBrandMiddleware = require("../../middleware/authBrand.js");

const { authCache } = require("../../authcache.js");

const router = express.Router();

// @route GET api/authbrand/branduser
// @desc  Test route
// @access Public
router.get("/branduser", authBrandMiddleware, async (req, res) => {
    try {
        const response = await findOneBrandById(req.brand.id);
        console.log("response", response);
        const user = {
            id: response.Id,
            name: response.Name,
            email: response.Email__c,
            phone: response.Phone__c,
            industry: response.Industry__c,
            type: "Brand",
        };
        res.json({user});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route  POST api/authbrand/signup
// @desc   Register a new brand
// @access Public
router.post(
    "/signup",
    [
        check("brandName", "Brand name is required").not().isEmpty(),
        check("brandEmail", "Please include a valid email").isEmail(),
        check(
            "brandPassword",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
        check(
            "brandPhone",
            "Please include a valid phone number"
        ).isMobilePhone(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            brandName,
            brandIndustry,
            brandEmail,
            brandPassword,
            brandPhone,
        } = req.body;

        try {
            // Check if the brand already exists in the database
            brand = await findOneBrandByPhoneOrEmail(
                brandPhone,
                brandEmail,
                authCache
            );

            if (brand) {
                return res
                    .status(400)
                    .json({
                        errors: [
                            {
                                msg: "Brand with this phone/email already exists",
                            },
                        ],
                    });
            }
            // encrypt the password

            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(brandPassword, salt);

            // create a new brand object
            result = await createBrand(
                brandName,
                brandIndustry,
                brandEmail,
                hashedPassword,
                brandPhone
            );

            const payload = {
                brand: {
                    id: result.id,
                },
            };

            // create a JWT token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 604800 }, // 1 week
                // { expiresIn: 3600 }, // 1 hour
                (err, token) => {
                    if (err) throw err;
                    res.status(201).json({
                        token,
                        user: {
                            id: result.id,
                            name: brandName,
                            email: brandEmail,
                            phone: brandPhone,
                            industry: brandIndustry,
                            type: "Brand",
                        },
                    });
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }
);

// @route POST api/authbrand/login
// @desc  Authenticate brand & get token
// @access Public
router.post(
    "/login",
    [
        check("brandEmail", "Please include a valid email").isEmail(),
        check("brandPassword", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { brandEmail, brandPassword } = req.body;

        try {
            // Check if the brand exists in the database
            let brand = await findOneBrandByPhoneOrEmail(null, brandEmail);

            if (!brand) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid credentials" }] });
            }

            // Check if the password matches
            const isMatch = await bcrypt.compare(
                brandPassword,
                brand.PasswordHash__c
            );

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid credentials" }] });
            }

            const payload = {
                brand: {
                    id: brand.Id,
                },
            };

            // create a JWT token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 604800 }, // 1 week
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: brand.Id,
                            name: brand.Name,
                            email: brand.Email__c,
                            phone: brand.Phone__c,
                            industry: brand.Industry__c,
                            type: "Brand",
                        },
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
