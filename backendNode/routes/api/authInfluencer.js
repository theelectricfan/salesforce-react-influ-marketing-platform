const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { check, validationResult } = require("express-validator");

const {
    findOneInfluencerByPhoneOrEmail,
    findOneInfluencerById,
} = require("../../salesforce/influencer/findOneInfluencer.js");
const {
    createInfluencer,
} = require("../../salesforce/influencer/createInfluencer.js");
const authInfluencerMiddleware = require("../../middleware/authInfluencer.js");

const { authCache } = require("../../authcache.js");

const router = express.Router();

// @route GET api/authinfluencer
// @desc  Test route
// @access Public
router.get("/influenceruser", authInfluencerMiddleware, async (req, res) => {
    try {
        const response = await findOneInfluencerById(req.influencer.id);
        console.log("response", response);
        const user = {
            id: response.Id,
            name: response.Name,
            email: response.Email__c,
            phone: response.Phone__c,
            category: response.Category__c,
            type: "Influencer",
        };
        res.json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route  POST api/authinfluencer/signup
// @desc   Register a new influencer
// @access Public
router.post(
    "/signup",
    [
        check("influencerName", "Influencer name is required").not().isEmpty(),
        check("influencerEmail", "Please include a valid email").isEmail(),
        check(
            "influencerPassword",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
        check(
            "influencerPhone",
            "Please include a valid phone number"
        ).isMobilePhone(),
    ],
    async (req, res) => {
        console.log("in backend node js influencer signup route");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            influencerName,
            influencerCategory,
            influencerEmail,
            influencerPassword,
            influencerPhone,
        } = req.body;

        try {
            // Check if the influencer already exists in the database
            influencer = await findOneInfluencerByPhoneOrEmail(
                influencerPhone,
                influencerEmail,
                authCache
            );

            if (influencer) {
                return res
                    .status(400)
                    .json({
                        errors: [
                            {
                                msg: "Influencer with this phone/email already exists",
                            },
                        ],
                    });
            }
            // encrypt the password

            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(influencerPassword, salt);

            // create a new influencer object
            result = await createInfluencer(
                influencerName,
                influencerCategory,
                influencerEmail,
                hashedPassword,
                influencerPhone
            );

            const payload = {
                influencer: {
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
                            name: influencerName,
                            email: influencerEmail,
                            phone: influencerPhone,
                            category: influencerCategory,
                            type: "Influencer",
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

// @route POST api/authinfluencer/login
// @desc  Authenticate influencer & get token
// @access Public
router.post(
    "/login",
    [
        check("influencerEmail", "Please include a valid email").isEmail(),
        check("influencerPassword", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { influencerEmail, influencerPassword } = req.body;

        try {
            // Check if the influencer exists in the database
            let influencer = await findOneInfluencerByPhoneOrEmail(
                null,
                influencerEmail
            );

            if (!influencer) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid credentials" }] });
            }

            // Check if the password matches
            const isMatch = await bcrypt.compare(
                influencerPassword,
                influencer.PasswordHash__c
            );

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid credentials" }] });
            }

            const payload = {
                influencer: {
                    id: influencer.Id,
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
                            id: influencer.Id,
                            name: influencer.Name,
                            email: influencer.Email__c,
                            phone: influencer.Phone__c,
                            category: influencer.Category__c,
                            type: "Influencer",
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
