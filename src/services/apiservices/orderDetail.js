import axiosInstance from './axios'
import Cookie from 'js-cookie'
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetSingleClientOrderList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/orders?clientId=${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetOrderList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetOrderList', err)
    onError && onError(err)
  }
}
export const GetAllClientOrderList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/orders`, {
      headers: { ...defaultHeaders },
      params: value,
    })
    console.log('Printing data of GetAllClientOrderList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAllClientOrderList', err)
    onError && onError(err)
  }
}

export const GetOrderDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/orderitems/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetOrderDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetOrderDetail', err)
    onError && onError(err)
  }
}
export const UpdatePaymentStatus = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.patch(
      `/payment/${value.orderId}`,
      value.paymentDetail,
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of UpdatePaymentStatus', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - UpdatePaymentStatus', err)
    onError && onError(err)
  }
}
