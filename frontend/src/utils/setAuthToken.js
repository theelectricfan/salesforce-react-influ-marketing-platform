import { axiosInstance } from "./axiosInstance";

const setAuthToken = (token) => {
    if (token){
        // Apply to every request
        axiosInstance.defaults.headers.common["x-auth-token"] = token;
    } else {
        // Delete auth header
        delete axiosInstance.defaults.headers.common["x-auth-token"];
    }
}

export {setAuthToken};