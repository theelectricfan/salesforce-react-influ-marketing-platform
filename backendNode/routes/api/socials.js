const express = require("express");
const authInfluencer = require("../../middleware/authInfluencer");
const createInfluencerSocial = require("../../salesforce/influencerSocial/createInfluencerSocial");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// @route  PPST api/influencersocials/
// @desc   Add influencersocials entry for a particular influencer
// @access Private

router.post(
    "/",
    [
        authInfluencer,
        [
            check("influencerID", "InfluencerID is required").not().isEmpty(),
            check("followerCount", "FollowerCount is required").not().isEmpty(),
            check("platform", "Platform is required").not().isEmpty(),
            check("profileURL", "ProfileURL is required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { influencerID, followerCount, platform, profileURL } =
                req.body;

            result = await createInfluencerSocial(
                influencerID,
                followerCount,
                platform,
                profileURL
            );

            const influencerSocialID = result.id;

            return res.json({ influencerSocialID });
        } catch (error) {
            console.error("Error creating influencer social", error);
            res.status(500).json({
                error: "Failed to create influencer social",
            });
        }
    }
);

module.exports = router;
