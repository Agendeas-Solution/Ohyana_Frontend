import axiosInstance from "./axios";
import Cookie from "js-cookie";
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  "Content-Type": "application/json",
  withCredentials: true,
  Authorization: `Barear ${Cookie.get("userToken")}`,
};
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetAdminProfile = async (value, onSuccess, onError) => {
  
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/profile`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetAdminProfile", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetAdminProfile", err);
    onError && onError(err);
  }
};
export const GetNotification = async (value, onSuccess, onError) => {
  
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/notification`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetNotification", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetNotification", err);
    onError && onError(err);
  }
};

export const GetSentNotification = async (value, onSuccess, onError) => {
  
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/notification?sent=true`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetSentNotification", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetSentNotification", err);
    onError && onError(err);
  }
};

export async function EditAdminProfile(formData, onSuccess, onError) {
  try {
    const res = await axiosInstance.put(`/profile`, formData, {
      headers: { ...defaultHeaders },
    });
    console.log(res);
    onSuccess && onSuccess(res);
  } catch (res_1) {
    onError && onError(res_1);
    console.log(res_1);
  }
}

export const GetAdminAppointmentOrReminder = async (
  value,
  onSuccess,
  onError
) => {
  
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(
      `/appointmentOrReminder?type=${value.type}`,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of GetAdminAppointmentOrReminder", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - GetAdminAppointmentOrReminder",
      err
    );
    onError && onError(err);
    // ////
  }
};
export const GetAdminDepartmentList = async (value, onSuccess, onError) => {
  
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/department`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetAdminDepartmentList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetAdminDepartmentList", err);
    onError && onError(err);
  }
};
export const GetAdminProductList = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/product`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetAdminProductList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetAdminProductList", err);
    onError && onError(err);
  }
};
export const DeleteAdminProduct = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.delete(`/product/${value}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of DeleteAdminProduct", response);
    onSuccess && onSuccess(response);
    //////
  } catch (err) {
    console.log("Got error while calling API - DeleteAdminProduct", err);
    onError && onError(err);
    //////
  }
};

export const AddAdminProduct = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(`/product`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of DeleteAdminProduct", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - DeleteAdminProduct", err);
    onError && onError(err);
    ////
  }
};
export const EditAdminProduct = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(
      `/product/${value.id}`,
      { name: value.name },
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of EditAdminProduct", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - EditAdminProduct", err);
    onError && onError(err);
    ////
  }
};

export const AddCalendarAppointment = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(
      `/appointmentOrReminder`,
      value,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of AddCalendarAppointment", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - AddCalendarAppointment", err);
    onError && onError(err);
    ////
  }
};

export const EditCalendarAppointment = async (id, value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  //debugger
  try {
    const response = await axiosInstance.put(
      `/appointmentOrReminder/${id}`,
      value,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of EditCalendarAppointment", response);
    onSuccess && onSuccess(response);
    //debugger
  } catch (err) {
    console.log("Got error while calling API - EditCalendarAppointment", err);
    onError && onError(err);
    //debugger
  }
};

export const EditCalendarReminder = async (id, value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  //debugger
  try {
    const response = await axiosInstance.put(
      `/appointmentOrReminder/${id}`,
      value,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of EditCalendarReminder", response);
    onSuccess && onSuccess(response);
    //////debugger
  } catch (err) {
    console.log("Got error while calling API - EditCalendarReminder", err);
    onError && onError(err);
    //////debugger
  }
};


export const AddCalendarReminder = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(
      `/appointmentOrReminder`,
      value,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of AddCalendarReminder", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - AddCalendarReminder", err);
    onError && onError(err);
    ////
  }
};

export const DeleteAppointment = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.delete(
      `/appointmentOrReminder/${value}`,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of DeleteAdminProduct", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - DeleteAdminProduct", err);
    onError && onError(err);
    ////
  }
};

export const DeleteReminder = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.delete(
      `/appointmentOrReminder/${value}`,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of DeleteReminder", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - DeleteReminder", err);
    onError && onError(err);
    ////
  }
};

export const GetAdminRole = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/role`, {
      headers: { ...defaultHeaders },
      params: { departmentId: value },
    });
    console.log("Printing response of DeleteReminder", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - DeleteReminder", err);
    onError && onError(err);
    ////
  }
};

export const CreateJobRole = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(`/role`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of CreateJobRole", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - CreateJobRole", err);
    onError && onError(err);
    ////
  }
};
export const EditJobRole = async (id, value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  //debugger;
  try {
    const response = await axiosInstance.put(`/role/${id}`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of CreateJobRole", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - CreateJobRole", err);
    onError && onError(err);
    ////
  }
};

export const AddClientStatus = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(`/status/client`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of AddClientStatus", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - AddClientStatus", err);
    onError && onError(err);
    ////
  }
};

export const EditClientStatus = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(`/status/client`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of EditClientStatus", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - EditClientStatus", err);
    onError && onError(err);
    ////
  }
};

export const AddAdminDepartment = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(`/department`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of AddDepartment", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - AddDepartment", err);
    onError && onError(err);
    ////
  }
};
export const EditAdminDepartment = async (id, value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(`/department/${id}`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of AddDepartment", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - AddDepartment", err);
    onError && onError(err);
    ////
  }
};

export const AddClientDetail = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(`/client`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of AddClientDetail", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - AddClientDetail", err);
    onError && onError(err);
    ////
  }
};
export const EditClientDetail = async (clientId, value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(
      `/client/${clientId}`,
      value,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of AddClientDetail", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - AddClientDetail", err);
    onError && onError(err);
    ////
  }
};


export const AddNotificationDetail = async (value, onSuccess, onError) => {
 defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(
      `/notification`,
      value,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of AddNotificationDetail", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - AddNotificationDetail", err);
    onError && onError(err);
    ////
  }
};


export const UpdatePermission = async (formData, onSuccess, onError) => {
  try {
    const res = await axiosInstance.put(`/permissions`, formData, {
      headers: { ...defaultHeaders },
    });
    console.log(res);
    onSuccess && onSuccess(res);
  } catch (res_1) {
    onError && onError(res_1);
    console.log(res_1);
  }
}

export const getUserPermissions = async (value, onSuccess, onError) => {
  //defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(
      `/permissions/${value}`,
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of getUserPermissions", response);
    onSuccess && onSuccess(response);
    ////
  } catch (err) {
    console.log("Got error while calling API - getUserPermissions", err);
    onError && onError(err);
    ////
  }
};
