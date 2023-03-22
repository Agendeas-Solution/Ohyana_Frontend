import axiosInstance from './axios'
import Cookie from 'js-cookie'
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetComplaintList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/complaint`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetComplaintList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetComplaintList', err)
    onError && onError(err)
  }
}
export const GetComplaintDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`dealer/complaint/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetComplaintDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetComplaintDetail', err)
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
    console.log('Printing data of AddStatusInComplaint', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - AddStatusInComplaint', err)
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
    console.log('Printing data of CloseTicket', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - CloseTicket', err)
    onError && onError(err)
  }
}
