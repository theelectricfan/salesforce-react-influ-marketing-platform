const axios = require("axios");
const {authCache} = require("../../authcache.js");
const {getNewToken} = require("../getAccessToken.js")

require("dotenv").config();

async function createInfluencerSocial(influencerID, followerCount, platform, profileURL, retry = true) {
    const { access_token, instance_url } = authCache;

    try {
        const response = await axios.post(
            `${instance_url}/services/data/v63.0/sobjects/Influencer_Socials__c/`,
            {
                Influncer__c : influencerID,
                Follower_Count__c : followerCount,
                Platform__c : platform,
                Profile_URL__c : profileURL
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;

    } catch (error) {
        if (error.response?.status === 401 && error.response?.data?.[0]?.errorCode === "INVALID_SESSION_ID" && retry) {
            console.warn("⚠️ Token possibly expired. Refreshing...");
            await getNewToken();
            // Avoid infinite loop by setting retry = false
            return await createInfluencerSocial(influencerID, followerCount,  platform, profileURL, false);
        }

        console.error("Error creating brand:", error.response);
        throw new Error("Failed to create brand from Salesforce.");
    }
}

module.exports = {
    createInfluencerSocial,
};