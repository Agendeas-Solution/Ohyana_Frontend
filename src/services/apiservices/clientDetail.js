import axiosInstance from "./axios";
import Cookie from "js-cookie";
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  "Content-Type": "application/json",
  withCredentials: true,
  Authorization: `Barear ${Cookie.get("userToken")}`,
};

export const GetAdminClientDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get("/clients", {
      headers: { ...defaultHeaders },
      params: value,
    });
    console.log("Printing response of GetAdminClientDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetAdminClientDetail", err);
    onError && onError(err);
  }
};
export const DeleteClientDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.delete(`/client/${value}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of DeleteClientDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - DeleteClientDetail", err);
    onError && onError(err);
  }
};

export const GetAdminClientProfileDetail = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/client/${id}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetAdminClientProfileDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - GetAdminClientProfileDetail",
      err
    );
    onError && onError(err);
  }
};

export const GetAdminClientStatusDetail = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/status/client/${id}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing responseee of GetAdminClientStatusDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - GetAdminClientStatusDetail",
      err
    );
    onError && onError(err);
    //
  }
};

export const GetAdminClientReminderDetail = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/reminder/client/${id}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetAdminClientReminderDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - GetAdminClientReminderDetail",
      err
    );
    onError && onError(err);
    //
  }
};

export const AddAdminClientReminderDetail = async (
  value,
  onSuccess,
  onError
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(`/reminder/client`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetAdminClientReminderDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - GetAdminClientReminderDetail",
      err
    );
    onError && onError(err);
  }
};
export const EditAdminClientReminderDetail = async (
  value,
  onSuccess,
  onError
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(`/reminder/client`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of EditAdminClientReminderDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - EditAdminClientReminderDetail",
      err
    );
    onError && onError(err);
  }
};

export const AddAdminClientAppointmentDetail = async (
  value,
  onSuccess,
  onError
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.post(`/appointment/client`, value, {
      headers: { ...defaultHeaders },
    });
    console.log(
      "Printing response of AddAdminClientAppointmentDetail",
      response
    );
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - AddAdminClientAppointmentDetail",
      err
    );
    onError && onError(err);
  }
};
export const EditAdminClientAppointmentDetail = async (
  value,
  onSuccess,
  onError
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(`/appointment/client`, value, {
      headers: { ...defaultHeaders },
    });
    console.log(
      "Printing response of EditAdminClientAppointmentDetail",
      response
    );
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - EditAdminClientAppointmentDetail",
      err
    );
    onError && onError(err);
  }
};

export const GetAdminClientAppointmentDetail = async (
  id,
  onSuccess,
  onError
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/appointment/client/${id}`, {
      headers: { ...defaultHeaders },
    });
    console.log(
      "Printing response of GetAdminClientAppointmentDetail",
      response
    );
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log(
      "Got error while calling API - GetAdminClientAppointmentDetail",
      err
    );
    onError && onError(err);
    //
  }
};

export const GetCountryList = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/country`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetCountryList", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetCountryList", err);
    onError && onError(err);
    //
  }
};

export const EditClientStage = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.put(`/stage/client/${id}`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of EditClientStage", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - EditClientStage", err);
    onError && onError(err);
  }
};

export const CustomerTake = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  console.log(defaultHeaders);
  try {
    const response = await axiosInstance.put(
      `/take/client/${id}`,
      {},
      {
        headers: { ...defaultHeaders },
      }
    );
    console.log("Printing response of CustomerTake", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - CustomerTake", err);
    onError && onError(err);
  }
};

export const GetBusinessCard = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/clients?businessCard=true`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetBusinessCard", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetBusinessCard", err);
    onError && onError(err);
    //
  }
};
export const GetBusinessDetail = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.get(`/businesscard/${id}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of GetBusinessDetail", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - GetBusinessDetail", err);
    onError && onError(err);
  }
};

export const DeleteBusinessCard = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const response = await axiosInstance.delete(`/businesscard/${id}`, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of DeleteBusinessCard", response);
    onSuccess && onSuccess(response);
  } catch (err) {
    console.log("Got error while calling API - DeleteBusinessCard", err);
    onError && onError(err);
  }
};
