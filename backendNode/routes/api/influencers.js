const express = require("express");

const router = express.Router();

const searchInfluencers = require("../../salesforce/influencer/searchInfluencers.js");


// @route  GET api/influencers/list
// @desc   Get list of all influencers
// @access Public

router.get("/list", async (req, res) => {
    const { page = 1, limit = 10, searchTerm = '' } = req.query;
    const offset = (page - 1) * limit;

    try {
        const influencers = await searchInfluencers(limit, offset, searchTerm);
        res.json({ influencers });
    }
    catch (error) {
        console.error("Error fetching influencers:", error);
        res.status(500).json({ error: "Failed to fetch influencers" });
    }
});


module.exports = router;