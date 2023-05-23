import axiosInstance from './axios'
import { setLoginToken, clearLoginToken /*getLoginToken*/ } from '../storage'
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
}
export const VerifyOTP = async (value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.post(`/verify`, value, {
      headers: { ...defaultHeaders },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}
export const SentOtp = async (value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.post(`/otp`, value, {
      headers: { ...defaultHeaders },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}
export const RegisterUser = async (value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.post(`/register`, value, {
      headers: { ...defaultHeaders },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}
