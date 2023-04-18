import axiosInstance from './axios'
import Cookie from 'js-cookie'
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetAdminProfile = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/profile`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetAdminProfile', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminProfile', err)
    onError && onError(err)
  }
}
export const GetCompanyProfile = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/company`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetCompanyProfile', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetCompanyProfile', err)
    onError && onError(err)
  }
}
export const GetNotification = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/notification`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetNotification', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetNotification', err)
    onError && onError(err)
  }
}

export const GetSentNotification = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/notification?sent=true`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetSentNotification', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetSentNotification', err)
    onError && onError(err)
  }
}

export async function EditAdminProfile(formData, onSuccess, onError) {
  try {
    const res = await axiosInstance.put(`/profile`, formData, {
      headers: { ...defaultHeaders },
    })
    console.log(res)
    onSuccess && onSuccess(res)
  } catch (res_1) {
    onError && onError(res_1)
    console.log(res_1)
  }
}

export const GetAdminAppointmentOrReminder = async (
  value,
  onSuccess,
  onError,
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(
      `/appointmentOrReminder?type=${value.type}`,
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of GetAdminAppointmentOrReminder', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log(
      'Got error while calling API - GetAdminAppointmentOrReminder',
      err,
    )
    onError && onError(err)
    // ////
  }
}
export const GetAdminDepartmentList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/department`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetAdminDepartmentList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminDepartmentList', err)
    onError && onError(err)
  }
}
export const GetAdminProductList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/product`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetAdminProductList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminProductList', err)
    onError && onError(err)
  }
}
export const DeleteAdminProduct = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.delete(`/product/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of DeleteAdminProduct', data)
    onSuccess && onSuccess(data)
    //////
  } catch (err) {
    console.log('Got error while calling API - DeleteAdminProduct', err)
    onError && onError(err)
    //////
  }
}

export const AddAdminProduct = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/product`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddAdminProduct', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - AddAdminProduct', err)
    onError && onError(err)
    ////
  }
}
export const UpdateProductQuantity = async (value, id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.patch(
      `/product/${id}`,
      { quantity: parseInt(value) },
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of UpdateProductQuantity', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - UpdateProductQuantity', err)
    onError && onError(err)
  }
}
export const EditAdminProduct = async (value, id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/product/${id}`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of EditAdminProduct', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - EditAdminProduct', err)
    onError && onError(err)
  }
}

export const AddCalendarAppointment = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/appointmentOrReminder`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddCalendarAppointment', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - AddCalendarAppointment', err)
    onError && onError(err)
    ////
  }
}

export const EditCalendarAppointment = async (
  id,
  value,
  onSuccess,
  onError,
) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(
      `/appointmentOrReminder/${id}`,
      value,
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of EditCalendarAppointment', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - EditCalendarAppointment', err)
    onError && onError(err)
  }
}

export const EditCalendarReminder = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(
      `/appointmentOrReminder/${id}`,
      value,
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of EditCalendarReminder', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - EditCalendarReminder', err)
    onError && onError(err)
  }
}

export const AddCalendarReminder = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/appointmentOrReminder`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddCalendarReminder', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - AddCalendarReminder', err)
    onError && onError(err)
    ////
  }
}

export const DeleteAppointment = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.delete(
      `/appointmentOrReminder/${value}`,
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of DeleteAdminProduct', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - DeleteAdminProduct', err)
    onError && onError(err)
    ////
  }
}

export const DeleteReminder = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.delete(
      `/appointmentOrReminder/${value}`,
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of DeleteReminder', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - DeleteReminder', err)
    onError && onError(err)
    ////
  }
}

export const GetAdminRole = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/role`, {
      headers: { ...defaultHeaders },
      params : value
    })
    console.log('Printing data of GetAdminRole', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - GetAdminRole', err)
    onError && onError(err)
    ////
  }
}

export const GetSingleRole = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/role/detail`, {
      headers: { ...defaultHeaders },
      params: { roleId: value },
    })
    console.log('Printing data of GetSingleRole', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - GetSingleRole', err)
    onError && onError(err)
    ////
  }
}
export const UpdateClockInOut = async ( value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/clockin-out`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of UpdateClockInOut', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - UpdateClockInOut', err)
    onError && onError(err)
  }
}
export const CreateJobRole = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/role`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of CreateJobRole', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - CreateJobRole', err)
    onError && onError(err)
    ////
  }
}
export const EditJobRole = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/role/${id}`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of EditJobRole', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - EditJobRole', err)
    onError && onError(err)
    ////
  }
}

export const AddClientStatus = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/status/client`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddClientStatus', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - AddClientStatus', err)
    onError && onError(err)
  }
}

export const AddCloseStatusApiCall = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.patch(`/client/status/closed`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddCloseStatusApiCall', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - AddCloseStatusApiCall', err)
    onError && onError(err)
  }
}

export const EditClientStatus = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/status/client`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of EditClientStatus', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - EditClientStatus', err)
    onError && onError(err)
    ////
  }
}

export const AddAdminDepartment = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/department`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddDepartment', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - AddDepartment', err)
    onError && onError(err)
    ////
  }
}
export const EditAdminDepartment = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/department/${id}`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddDepartment', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - AddDepartment', err)
    onError && onError(err)
    ////
  }
}

export const AddClientDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/client`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddClientDetail', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - AddClientDetail', err)
    onError && onError(err)
    ////
  }
}
export const EditClientDetail = async (clientId, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/client/${clientId}`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddClientDetail', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - AddClientDetail', err)
    onError && onError(err)
    ////
  }
}

export const AddNotificationDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/notification`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of AddNotificationDetail', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - AddNotificationDetail', err)
    onError && onError(err)
    ////
  }
}

export const UpdatePermission = async (formData, onSuccess, onError) => {
  try {
    const res = await axiosInstance.put(`/permissions`, formData, {
      headers: { ...defaultHeaders },
    })
    console.log(res)
    onSuccess && onSuccess(res)
  } catch (res_1) {
    onError && onError(res_1)
    console.log(res_1)
  }
}

export const getUserPermissions = async (value, onSuccess, onError) => {
  //defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
  try {
    const { data } = await axiosInstance.get(`/permissions/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of getUserPermissions', data)
    onSuccess && onSuccess(data)
    ////
  } catch (err) {
    console.log('Got error while calling API - getUserPermissions', err)
    onError && onError(err)
    ////
  }
}

export const GetAdminAttendanceList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/attendance`, {
      headers: { ...defaultHeaders },
    })

    console.log('Printing data of GetAdminAttendanceList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminAttendanceList', err)
    onError && onError(err)
  }
}
export const GetAdminLeaveList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`user/leave`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetAdminAttendanceList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminAttendanceList', err)
    onError && onError(err)
  }
}
