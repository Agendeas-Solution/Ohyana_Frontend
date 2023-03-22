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
        const {data} = await axiosInstance.get("/points/rules", {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of GetPointRule", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - GetPointRule", err);
        onError && onError(err);
    }
};
export const GetPointTeamMember = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.get(`/points?teamId=${value?.teamId}&page=${value?.page}&size=${value.size}&year=${value.year}&month=${value.month}`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of GetPointTeamMember", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - GetPointTeamMember", err);
        onError && onError(err);
    }
};
export const GiveAppreciation = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.post(`/appreciation/points/${value}`,{}, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of GiveAppreciation", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - GiveAppreciation", err);
        onError && onError(err);
    }
};
