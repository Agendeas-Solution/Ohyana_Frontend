import axiosInstance from "./axios";
import Cookie from "js-cookie";
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
    "Content-Type": "application/json",
    withCredentials: true,
    Authorization: `Barear ${Cookie.get("userToken")}`,
};
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetDealerList = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const response = await axiosInstance.get(`/dealer`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing response of GetDealerList", response);
        onSuccess && onSuccess(response);
    } catch (err) {
        console.log("Got error while calling API - GetDealerList", err);
        onError && onError(err);
    }
};
export const AddDealerCall = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const response = await axiosInstance.post(`/company/dealer`,value, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing response of AddDealerCall", response);
        onSuccess && onSuccess(response);
    } catch (err) {
        console.log("Got error while calling API - AddDealerCall", err);
        onError && onError(err);
    }
};