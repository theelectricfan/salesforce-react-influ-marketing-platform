const express = require('express');
const {router} = express.Router();
const auth = require('../../middleware/authBrand.js');
const { findOneBrandById } = require('../../salesforce/brand/findOneBrand.js');


// @route GET api/profile/me
// @desc  Get current user's profile
// @access Private
router.get(
    '/me',
    auth,
    async (req, res) => {
        try {
            // Get the brand's profile from the database
            const brandProfile = await findOneBrandById(req.brand.id)

            if (!brandProfile) {
                return res.status(400).json({ msg: 'There is no profile for this brand' });
            }


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
)