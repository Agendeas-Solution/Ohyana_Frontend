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
    const response = await axiosInstance.get(`/feedback/member/${value}`, {
      headers: { ...defaultHeaders },
    });
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
      params: { admin: true },
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
export const GetStaffAttendanceList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(
      `/attendance?teamId=${parseInt(value)}&profile=true`,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of GetStaffAttendanceList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetStaffAttendanceList", err);
    onError && onError(err);
  }
};
export const GetStaffLeaveList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`user/leave?teamId=${value}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetStaffLeaveList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetStaffLeaveList", err);
    onError && onError(err);
  }
};
export const GetHolidayList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/holiday`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetHolidayList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetHolidayList", err);
    onError && onError(err);
  }
};
export const GetExpenseList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/team/expense?teamId=${value}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetExpenseList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetExpenseList", err);
    onError && onError(err);
  }
};
export const GetExpenseTypeList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/expense`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetExpenseList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetExpenseList", err);
    onError && onError(err);
  }
};
export const PaymentStatusUpdate = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.patch(
      `/expense/${value}?payment=true`,
      { status: "DONE" },
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of PaymentStatusUpdate", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - PaymentStatusUpdate", err);
    onError && onError(err);
  }
};
export const StatusUpdate = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.patch(
      `/expense/${id}`,
      { status: value },
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of StatusUpdate", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - StatusUpdate", err);
    onError && onError(err);
  }
};

export const GetUsersAttendanceList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(
      `/attendanceofall?month=${value?.month}&year=${value?.year}`,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of GetExpenseList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetExpenseList", err);
    onError && onError(err);
  }
};
export const AttendanceStatus = async (type, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(
      `/attendance?${type}=true`,
      {},
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of AttendanceStatus", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - AttendanceStatus", err);
    onError && onError(err);
  }
};
export const GetInquiryAnalytics = async (type, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/dashboard/inquiry`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetInquiryAnalytics", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetInquiryAnalytics", err);
    onError && onError(err);
  }
};
export const GetSalesInquiry = async (type, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/dashboard/sales/inquiry`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetSalesInquiry", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetSalesInquiry", err);
    onError && onError(err);
  }
};
export const GrantLeave = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(
      `/grant/leave/${value?.id}?isApproved=${value?.leaveStatus}`,
      {},
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of GrantLeave", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GrantLeave", err);
    onError && onError(err);
  }
};
