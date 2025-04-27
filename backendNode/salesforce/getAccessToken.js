const axios = require("axios");
const {authCache} = require("../authcache.js");

require("dotenv").config();

const { CLIENT_KEY, CLIENT_SECRET, UNAME, PASSWORD, SECURITY_TOKEN } =
    process.env;

async function getAccessToken() {
    try{
        const response = await axios.post(
            "https://login.salesforce.com/services/oauth2/token",
            {
                grant_type: "password",
                client_id: CLIENT_KEY,
                client_secret: CLIENT_SECRET,
                username: UNAME,
                password: PASSWORD + SECURITY_TOKEN,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        authCache.access_token = response.data.access_token;
        authCache.instance_url = response.data.instance_url;
    }
    catch (error) {
        console.error("Error fetching access token:", error.response.data);
        throw new Error("Failed to fetch access token from Salesforce.");
    }
}

module.exports = {
    getAccessToken,
};
