import axiosInstance from './axios'
import Cookie from 'js-cookie'
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}

export const GetAdminClientDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get('/clients', {
      headers: { ...defaultHeaders },
      params: value,
    })
    console.log('Printing data of GetAdminClientDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminClientDetail', err)
    onError && onError(err)
  }
}
export const GetCityList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get('/city', {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetCityList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetCityList', err)
    onError && onError(err)
  }
}
export const GetStateList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get('/state', {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetStateList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetStateList', err)
    onError && onError(err)
  }
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

export const GetAdminClientProfileDetail = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/client/${id}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetAdminClientProfileDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log(
      'Got error while calling API - GetAdminClientProfileDetail',
      err,
    )
    onError && onError(err)
  }
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
export const GetAdminClientStatusDetail = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/status/client/${id}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing dataee of GetAdminClientStatusDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminClientStatusDetail', err)
    onError && onError(err)
    //
  }
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

export const GetAdminClientReminderDetail = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/reminder/client/${id}`, {
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
    //
  }
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
  onSuccess,
  onError,
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/appointment/client/${id}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetAdminClientAppointmentDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log(
      'Got error while calling API - GetAdminClientAppointmentDetail',
      err,
    )
    onError && onError(err)
    //
  }
}

export const GetCountryList = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/country`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetCountryList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetCountryList', err)
    onError && onError(err)
    //
  }
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

export const GetBusinessCard = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/clients?tabType=business_card`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetBusinessCard', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetBusinessCard', err)
    onError && onError(err)
  }
}
export const GetBusinessDetail = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/businesscard/${id}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetBusinessDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetBusinessDetail', err)
    onError && onError(err)
  }
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
