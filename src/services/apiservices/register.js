import axiosInstance from "./axios";
import { setLoginToken, clearLoginToken /*getLoginToken*/ } from "../storage";
// let BaseUrl = process.env.REACT_APP_API_URL;

const defaultHeaders = {
    "Content-Type": "application/json",
    withCredentials: true,
};
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const VerifyOTP = async (value, onSuccess, onError) => {
    try {
        const response = await axiosInstance.post(`/verify`, value, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing response of VerifyOTP", response);
        onSuccess && onSuccess(response);
        //debugger;
    } catch (err) {
        console.log("Got error while calling API - VerifyOTP", err);
        onError && onError(err);
    }
};
export const SentOtp = async (value, onSuccess, onError) => {
    try {
        const response = await axiosInstance.post(`/otp`, value, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing response of SentOtp", response);
        onSuccess && onSuccess(response);
        //debugger;
    } catch (err) {
        console.log("Got error while calling API - SentOtp", err);
        onError && onError(err);
    }
};


export const RegisterUser = async (value, onSuccess, onError) => {
    try {
        const response = await axiosInstance.post(`/register`, value, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing response of RegisterUser", response);
        onSuccess && onSuccess(response);
    } catch (err) {
        console.log("Got error while calling API - RegisterUser", err);
        onError && onError(err);
    }
};