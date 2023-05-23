import axiosInstance from './axios'
import Cookie from 'js-cookie'
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
export const GetComplaintList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/complaint`, {
      headers: { ...defaultHeaders },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}
export const GetComplaintDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`dealer/complaint/${value}`, {
      headers: { ...defaultHeaders },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}

export const AddStatusInComplaint = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(
      `/status/complaint/${value?.id}`,
      { description: value?.description },
      {
        headers: { ...defaultHeaders },
      },
    )
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}

export const CloseTicket = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(
      `close/complaint/${value}`,
      {},
      {
        headers: { ...defaultHeaders },
      },
    )
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}
