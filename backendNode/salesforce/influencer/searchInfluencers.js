const axios = require("axios");
const { authCache } = require("../../authcache.js");
const { getAccessToken } = require("../getAccessToken.js");

require("dotenv").config();

async function searchInfluencers(
    limit = 10,
    offset = 0,
    searchTerm = "",
    retry = true
) {
    const { access_token, instance_url } = authCache;

    try {
        const response = await axios.get(
            `${instance_url}/services/data/v63.0/query`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    q: `SELECT Id, Name, Phone__c, Email__c, Category__c, Approved__c FROM Influencer__c WHERE Name LIKE '%${searchTerm}%' LIMIT ${limit} OFFSET ${offset}`,
                },
            }
        );
        console.log("Response data:", response);
        return response.data?.records;
    } catch (error) {
        if (error.response?.status === 401 && error.response?.data?.[0]?.errorCode === "INVALID_SESSION_ID" && retry) {
            console.warn("⚠️ Token possibly expired. Refreshing...");
            await getAccessToken();
            // Avoid infinite loop by setting retry = false
            return await searchInfluencers(
                limit,
                offset,
                false
            );
        }

        throw new Error(
            "Failed to search influencer from Salesforce."
        );
    }
}

module.exports = searchInfluencers;