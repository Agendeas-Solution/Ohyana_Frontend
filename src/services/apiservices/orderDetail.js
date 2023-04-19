import { handleApiGetCall } from './api-manager'
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
  await handleApiGetCall(`/orders`, value, onSuccess, onError)
}

export const GetOrderDetail = async (id, value, onSuccess, onError) => {
  await handleApiGetCall(`/orderitems/${id}`, value, onSuccess, onError)
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
