import axiosInstance from "./axios";
import Cookie from "js-cookie";
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
    "Content-Type": "application/json",
    withCredentials: true,
    Authorization: `Barear ${Cookie.get("userToken")}`,
};

export const GetPointRule = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const response = await axiosInstance.get("/points/rules", {
            headers: { ...defaultHeaders },
        });
        console.log("Printing response of GetPointRule", response);
        onSuccess && onSuccess(response);
    } catch (err) {
        console.log("Got error while calling API - GetPointRule", err);
        onError && onError(err);
    }
};
export const GetPointTeamMember = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const response = await axiosInstance.get(`/points?teamId=${value?.teamId}&page=${value?.page}&size=${value.size}&year=${value.year}&month=${value.month}`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing response of GetPointTeamMember", response);
        onSuccess && onSuccess(response);
    } catch (err) {
        console.log("Got error while calling API - GetPointTeamMember", err);
        onError && onError(err);
    }
};
export const GiveAppreciation = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const response = await axiosInstance.post(`/appreciation/points/${value}`,{}, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing response of GiveAppreciation", response);
        onSuccess && onSuccess(response);
    } catch (err) {
        console.log("Got error while calling API - GiveAppreciation", err);
        onError && onError(err);
    }
};
