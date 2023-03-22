import axiosInstance from "./axios";
import Cookie from "js-cookie";
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
    "Content-Type": "application/json",
    withCredentials: true,
    Authorization: `Barear ${Cookie.get("userToken")}`,
};

export const GetAllHoliday = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.get("/holiday?type=occasional", {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of GetAllHoliday", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - GetAllHoliday", err);
        onError && onError(err);
    }
};
export const GetAllLeaveType = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.get("/leave", {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of GetAllLeaveType", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - GetAllLeaveType", err);
        onError && onError(err);
    }
};
export const ApplyLeave = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.post("/apply/leave", value, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of ApplyLeave", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - ApplyLeave", err);
        onError && onError(err);
    }
};

export const CreateHoliday = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.post("/holiday?regular=true", value, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of CreateHoliday", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - CreateHoliday", err);
        onError && onError(err);
    }
};

export const UpdateHoliday = async (id, holidayDetail, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.put(`/holiday/${id}`, holidayDetail, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of UpdateHoliday", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - UpdateHoliday", err);
        onError && onError(err);
    }
};
export const DeleteHoliday = async (id, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.delete(`/holiday/${id}`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of DeleteHoliday", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - DeleteHoliday", err);
        onError && onError(err);
    }
};

export const CreateLeaveType = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.post("/leave", value, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of CreateLeaveType", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - CreateLeaveType", err);
        onError && onError(err);
    }
};

export const DeleteLeaveType = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.delete(`/leave/${value}`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of DeleteLeaveType", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - DeleteLeaveType", err);
        onError && onError(err);
    }
};
export const UpdateLeaveType = async (id, data, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.put(`/leave/${id}`, data, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of UpdateLeaveType", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - UpdateLeaveType", err);
        onError && onError(err);
    }
};