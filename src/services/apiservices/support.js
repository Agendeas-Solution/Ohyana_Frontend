import axiosInstance from "./axios";
import Cookie from "js-cookie";
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
    "Content-Type": "application/json",
    withCredentials: true,
    Authorization: `Barear ${Cookie.get("userToken")}`,
};
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetComplaintList = async (value, onSuccess, onError) => {

    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
    const response = await axiosInstance.get(`/complaint`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing response of GetComplaintList", response);
        onSuccess && onSuccess(response);
    } catch (err) {
        console.log("Got error while calling API - GetComplaintList", err);
        onError && onError(err);
    }
};