import axiosInstance from "./axios";
import Cookie from "js-cookie";
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
    "Content-Type": "application/json",
    withCredentials: true,
    Authorization: `Barear ${Cookie.get("userToken")}`,
};
export const GetCompanyProfile = async (value, onSuccess, onError) => {

    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.get(`/company`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of GetCompanyProfile", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - GetCompanyProfile", err);
        onError && onError(err);
    }
};
export const editCompanyProfile = async (value, onSuccess, onError) => {

    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.put(`/company`, value, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of editCompanyProfile", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - editCompanyProfile", err);
        onError && onError(err);
    }
};