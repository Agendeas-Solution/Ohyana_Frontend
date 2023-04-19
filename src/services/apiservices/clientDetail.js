import axiosInstance from './axios'
import Cookie from 'js-cookie'
import { handleApiGetCall } from './api-manager'
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}

export const GetAllClients = async (value, onSuccess, onError) => {
  await handleApiGetCall('/clients', value, onSuccess, onError)
}

export const GetCityList = async (value, onSuccess, onError) => {
  await handleApiGetCall('/city', value, onSuccess, onError)
}
export const GetStateList = async (value, onSuccess, onError) => {
  await handleApiGetCall('/state', value, onSuccess, onError)
}

export const DeleteClientDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.delete(`/client/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of DeleteClientDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - DeleteClientDetail', err)
    onError && onError(err)
  }
}

export const GetAdminClientProfileDetail = async (
  id,
  value,
  onSuccess,
  onError,
) => {
  await handleApiGetCall(`/client/${id}`, value, onSuccess, onError)
}
export const UpdatePJPDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/pjp`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of UpdatePJPDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - UpdatePJPDetail', err)
    onError && onError(err)
  }
}
export const GetAdminClientStatusDetail = async (
  id,
  value,
  onSuccess,
  onError,
) => {
  await handleApiGetCall(`/status/client/${id}`, value, onSuccess, onError)
}
export const AddPoorContact = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/status/client/`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddPoorContact', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - AddPoorContact', err)
    onError && onError(err)
  }
}

export const GetAdminClientReminderDetail = async (
  id,
  value,
  onSuccess,
  onError,
) => {
  await handleApiGetCall(`/reminder/client/${id}`, value, onSuccess, onError)
}

export const AddAdminClientReminderDetail = async (
  value,
  onSuccess,
  onError,
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/reminder/client`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetAdminClientReminderDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log(
      'Got error while calling API - GetAdminClientReminderDetail',
      err,
    )
    onError && onError(err)
  }
}
export const EditAdminClientReminderDetail = async (
  value,
  onSuccess,
  onError,
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/reminder/client`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of EditAdminClientReminderDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log(
      'Got error while calling API - EditAdminClientReminderDetail',
      err,
    )
    onError && onError(err)
  }
}

export const AddAdminClientAppointmentDetail = async (
  value,
  onSuccess,
  onError,
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/appointment/client`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddAdminClientAppointmentDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log(
      'Got error while calling API - AddAdminClientAppointmentDetail',
      err,
    )
    onError && onError(err)
  }
}
export const EditAdminClientAppointmentDetail = async (
  value,
  onSuccess,
  onError,
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/appointment/client`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of EditAdminClientAppointmentDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log(
      'Got error while calling API - EditAdminClientAppointmentDetail',
      err,
    )
    onError && onError(err)
  }
}

export const GetAdminClientAppointmentDetail = async (
  id,
  value,
  onSuccess,
  onError,
) => {
  await handleApiGetCall(`/appointment/client/${id}`, value, onSuccess, onError)
}

export const GetCountryList = async (id, onSuccess, onError) => {
  await handleApiGetCall(`/country`, {}, onSuccess, onError)
}

export const EditClientStage = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/stage/client/${id}`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of EditClientStage', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - EditClientStage', err)
    onError && onError(err)
  }
}

export const CustomerTake = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  console.log(defaultHeaders)
  try {
    const { data } = await axiosInstance.put(
      `/take/client/${id}`,
      {},
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of CustomerTake', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - CustomerTake', err)
    onError && onError(err)
  }
}

export const GetBusinessDetail = async (id, onSuccess, onError) => {
  await handleApiGetCall(`/businesscard/${id}`, {}, onSuccess, onError)
}

export const DeleteBusinessCard = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.delete(`/businesscard/${id}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of DeleteBusinessCard', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - DeleteBusinessCard', err)
    onError && onError(err)
  }
}
