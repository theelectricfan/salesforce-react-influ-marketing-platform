const axios = require("axios");
const {authCache} = require("../../authcache.js");
const {getNewToken} = require("../getAccessToken.js")

require("dotenv").config();

async function createInfluencer(influencerName, influencerCategory, influencerEmail, hashedPassword, influencerPhone, retry = true) {
    const { access_token, instance_url } = authCache;

    try {
        const response = await axios.post(
            `${instance_url}/services/data/v63.0/sobjects/Influencer__c/`,
            {
                Name: influencerName,
                Email__c: influencerEmail,
                Category__c: influencerCategory,
                PasswordHash__c: hashedPassword,
                Phone__c: influencerPhone,
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
            return await createInfluencer(influencerName, influencerIndustry, influencerEmail, hashedPassword, influencerPhone, false);
        }

        console.error("Error creating influencer:", error.response);
        throw new Error("Failed to create influencer from Salesforce.");
    }
}

module.exports = {
    createInfluencer,
};