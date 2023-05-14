import axiosInstance from './axios'
import { setLoginToken, clearLoginToken /*getLoginToken*/ } from '../storage'
// let BaseUrl = process.env.REACT_APP_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
}
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };

export async function login(formData, onSuccess, onError) {
  try {
    const { data } = await axiosInstance.post(`/login`, formData, {
      headers: { ...defaultHeaders },
    })
    console.log(data)
    let authToken = data?.data?.token
    setLoginToken(authToken)
    localStorage.setItem('permissions', JSON.stringify(data?.data?.permissions))
    localStorage.setItem('userImageUrl', data?.data?.userImageUrl)
    onSuccess && onSuccess(data)
  } catch (res_1) {
    clearLoginToken()
    onError && onError(res_1)
    console.log(res_1)
  }
}
export const ForgotPassword = async (value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.post(`/forgot-password`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of ForgotPassword', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - ForgotPassword', err)
    onError && onError(err)
  }
}

export const ResetPassword = async (token, value, onSuccess, onError) => {
  try {
    const data = await axiosInstance.post(`/reset-password/${token}`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of ResetPassword', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - ResetPassword', err)
    onError && onError(err)
  }
}
