const axios = require("axios");
const {authCache} = require("../../authcache.js");
const {getNewToken} = require("../getAccessToken.js")

require("dotenv").config();

async function createBrand(brandName, brandIndustry, brandEmail, hashedPassword, brandPhone, retry = true) {
    const { access_token, instance_url } = authCache;

    try {
        const response = await axios.post(
            `${instance_url}/services/data/v63.0/sobjects/Brand__c/`,
            {
                Name: brandName,
                Email__c: brandEmail,
                Industry__c: brandIndustry,
                PasswordHash__c: hashedPassword,
                Phone__c: brandPhone,
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
            return await createBrand(brandName, brandIndustry, brandEmail, hashedPassword, brandPhone, false);
        }

        console.error("Error creating brand:", error.response);
        throw new Error("Failed to create brand from Salesforce.");
    }
}

module.exports = {
    createBrand,
};