import { handleApiGetCall } from './api-manager'
import axiosInstance from './axios'
import Cookie from 'js-cookie'
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
export const GetPJPList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/pjp`, value, onSuccess, onError)
}
export const GetTargetList = async (value, onSuccess, onError) => {
  await handleApiGetCall(
    `/targets/${value.teamId}`,
    {
      month: value.month,
      year: value.year,
    },
    onSuccess,
    onError,
  )
}

export const CreatePJP = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/pjp`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of CreatePJP', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - CreatePJP', err)
    onError && onError(err)
  }
}
export const CompletePJPStatus = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/complete/pjp`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of CompletePJPStatus', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - CompletePJPStatus', err)
    onError && onError(err)
  }
}
export const GetPJPDetail = async (id, onSuccess, onError) => {
  await handleApiGetCall(`/pjp/${id}`, {}, onSuccess, onError)
}
