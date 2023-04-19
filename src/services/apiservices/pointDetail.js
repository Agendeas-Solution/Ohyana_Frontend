import { handleApiGetCall } from './api-manager'
import axiosInstance from './axios'
import Cookie from 'js-cookie'
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}

export const GetPointRule = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/points/rules`, value, onSuccess, onError)
}
export const GetPointTeamMember = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/points`, value, onSuccess, onError)
}
export const GiveAppreciation = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(
      `/appreciation/points/${value}`,
      {},
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of GiveAppreciation', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GiveAppreciation', err)
    onError && onError(err)
  }
}
