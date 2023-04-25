import axiosInstance from './axios'
import Cookie from 'js-cookie'
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetProductDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/product/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetOrderList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetOrderList', err)
    onError && onError(err)
  }
}
export const GetProductReport = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(
      `/report/product?period=${value.selectedPeriod}`,
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of GetProductReport', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetProductReport', err)
    onError && onError(err)
  }
}

export const GetTeamReport = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/report/team`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetProductReport', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetProductReport', err)
    onError && onError(err)
  }
}
