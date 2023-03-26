import axiosInstance from './axios'
import { setLoginToken, clearLoginToken /*getLoginToken*/ } from '../storage'
// let BaseUrl = process.env.REACT_APP_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
}
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const VerifyOTP = async (value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.post(`/verify`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of VerifyOTP', data)
    onSuccess && onSuccess(data)
    ;
  } catch (err) {
    console.log('Got error while calling API - VerifyOTP', err)
    onError && onError(err)
  }
}
export const SentOtp = async (value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.post(`/otp`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of SentOtp', data)
    onSuccess && onSuccess(data)
    ;
  } catch (err) {
    console.log('Got error while calling API - SentOtp', err)
    onError && onError(err)
  }
}
export const RegisterUser = async (value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.post(`/register`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of RegisterUser', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - RegisterUser', err)
    onError && onError(err)
  }
}
