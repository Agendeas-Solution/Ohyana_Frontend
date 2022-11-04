import axiosInstance from "./axios";
import { setLoginToken, clearLoginToken /*getLoginToken*/ } from "../storage";
// let BaseUrl = process.env.REACT_APP_API_URL;

const defaultHeaders = {
  "Content-Type": "application/json",
  withCredentials: true,
};
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };

export async function login(formData, onSuccess, onError) {
  try {
    const res = await axiosInstance.post(`/login`, formData, {
      headers: { ...defaultHeaders },
    });
    console.log(res)

    let authToken = res?.data?.token;
    setLoginToken(authToken);
    localStorage.setItem('permissions', JSON.stringify(res?.data?.permissions));
    
    onSuccess && onSuccess(res);
  } catch (res_1) {
    clearLoginToken();
    onError && onError(res_1);
    console.log(res_1)

  }
}
export const ForgotPassword = async (value, onSuccess, onError) => {
  try {
    const response = await axiosInstance.post(`/forgot-password`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of ForgotPassword", response);
    onSuccess && onSuccess(response);
    //debugger;
  } catch (err) {
    console.log("Got error while calling API - ForgotPassword", err);
    onError && onError(err);
  }
};


export const ResetPassword = async (token,value, onSuccess, onError) => {
  try {
    const response = await axiosInstance.post(`/reset-password/${token}`, value, {
      headers: { ...defaultHeaders },
    });
    console.log("Printing response of ResetPassword", response);
    onSuccess && onSuccess(response);
    //debugger;
  } catch (err) {
    console.log("Got error while calling API - ResetPassword", err);
    onError && onError(err);
  }
};