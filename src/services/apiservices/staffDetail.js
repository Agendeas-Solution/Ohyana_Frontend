import axiosInstance from "./axios";
import Cookie from "js-cookie";
const defaultHeaders = {
  "Content-Type": "application/json",
  withCredentials: true,
  Authorization: `Barear ${Cookie.get("userToken")}`,
};
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetAdminStaffDetailList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get("/member", {
      headers: { ...defaultHeaders },
      params: value,
    });
    console.log("Printing response of GetAdminProfile", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetAdminProfile", err);
    onError && onError(err);
  }
};
export const GetAdminStaffProfileDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/member/${value}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetAdminStaffProfileDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - GetAdminStaffProfileDetail",
      err
    );
    onError && onError(err);
  }
};

export const GetAdminStaffRatingDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(
      `/feedback/member/${value}`,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of GetAdminStaffRatingDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetAdminStaffRatingDetail", err);
    onError && onError(err);
  }
};

export const GiveFeedBack = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(`/feedback/member`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GiveFeedBack", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GiveFeedBack", err);
    onError && onError(err);
  }
};
export const GetAllStaffList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/member`, {
      headers: { ...defaultHeaders },
      params: {admin:true},
    });
    console.log("Printing response of GetAllStaffList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetAllStaffList", err);
    onError && onError(err);
  }
};
export const AddEmployee = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(`/member`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GiveFeedBack", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GiveFeedBack", err);
    onError && onError(err);
  }
};

export const EditEmployee = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(`/member/${id}`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GiveFeedBack", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GiveFeedBack", err);
    onError && onError(err);
  }
};
export const DeleteDepartment = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.delete(`/department/${id}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of DeleteDepartment", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - DeleteDepartment", err);
    onError && onError(err);
  }
};


export const DeleteJobRole = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.delete(`/role/${id}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of DeleteJobRole", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - DeleteJobRole", err);
    onError && onError(err);
  }
};

