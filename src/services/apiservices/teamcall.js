import axiosInstance from './axios'
import Cookie from 'js-cookie'
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
export const GetPJPList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/pjp`, {
      headers: { ...defaultHeaders },
      params: value,
    })
    console.log('Printing data of GetPJPList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetPJPList', err)
    onError && onError(err)
  }
}
export const GetTargetList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/targets/${value.teamId}`, {
      headers: { ...defaultHeaders },
      params: {
        month: value.month,
        year: value.year,
      },
    })
    console.log('Printing data of GetTargetList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetTargetList', err)
    onError && onError(err)
  }
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
export const GetPJPDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/pjp/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetPJPDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetPJPDetail', err)
    onError && onError(err)
  }
}
