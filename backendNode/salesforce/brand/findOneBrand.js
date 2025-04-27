const axios = require("axios");
const { authCache } = require("../../authcache.js");
const { getAccessToken } = require("../getAccessToken.js");

require("dotenv").config();

async function findOneBrandByPhoneOrEmail(
    brandPhone,
    brandEmail,
    retry = true
) {
    const { access_token, instance_url } = authCache;
    console.log("Access token:", access_token);
    console.log("Instance URL:", instance_url);

    try {
        const response = await axios.get(
            `${instance_url}/services/data/v63.0/query`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    q: `SELECT Id, PasswordHash__c, Phone__c, Email__c FROM Brand__c WHERE Phone__c='${brandPhone}' OR Email__c='${brandEmail}' LIMIT 1`,
                },
            }
        );
        console.log("Response data:", response);
        return response.data?.records[0];
    } catch (error) {
        if (error.response?.status === 401 && error.response?.data?.[0]?.errorCode === "INVALID_SESSION_ID" && retry) {
            console.warn("⚠️ Token possibly expired. Refreshing...");
            await getAccessToken();
            // Avoid infinite loop by setting retry = false
            return await findOneBrandByPhoneOrEmail(
                brandPhone,
                brandEmail,
                false
            );
        }

        console.error("Error fetching brand by phone or email", error.response);
        throw new Error(
            "Failed to search one brand by number or email from Salesforce."
        );
    }
}

async function findOneBrandById(brandId, retry = true) {
    const { access_token, instance_url } = authCache;

    try {
        const response = await axios.get(
            `${instance_url}/services/data/v63.0/sobjects/Brand__c/${brandId}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        if (
            error.response?.status === 401 &&
            error.response?.data?.[0]?.errorCode === "INVALID_SESSION_ID" &&
            retry
        ) {
            console.warn("⚠️ Token possibly expired. Refreshing...");
            await getAccessToken();
            // Avoid infinite loop by setting retry = false
            return await findOneBrandById(brandId, false);
        }

        console.error("Error fetching brand by id", error.response);
        throw new Error("Failed to search one brand by id from Salesforce.");
    }
}

module.exports = {
    findOneBrandByPhoneOrEmail,
    findOneBrandById,
};
