import axiosInstance from './axios'
import { setLoginToken, clearLoginToken } from '../storage'

const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
}

export async function login(formData, onSuccess, onError) {
  try {
    const { data } = await axiosInstance.post(`/login`, formData, {
      headers: { ...defaultHeaders },
    })
    let authToken = data?.data?.token
    setLoginToken(authToken)
    localStorage.setItem('permissions', JSON.stringify(data?.data?.permissions))
    localStorage.setItem('clientStageAccess', data?.data?.clientStageAccess)
    localStorage.setItem('userImageUrl', data?.data?.userImageUrl)
    onSuccess && onSuccess(data)
  } catch (res_1) {
    onError && onError(res_1)
  }
}
export const ForgotPassword = async (value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.post(`/forgot-password`, value, {
      headers: { ...defaultHeaders },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}

export const ResetPassword = async (token, value, onSuccess, onError) => {
  try {
    const data = await axiosInstance.post(`/reset-password/${token}`, value, {
      headers: { ...defaultHeaders },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}
