import { handleApiGetCall } from './api-manager'
import axiosInstance from './axios'
import Cookie from 'js-cookie'
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetAdminStaffDetailList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/member`, value, onSuccess, onError)
}
export const GetSingleStaffDetailList = async (id, onSuccess, onError) => {
  await handleApiGetCall(`/team/leaderboard/${id}`, {}, onSuccess, onError)
}
export const GetAdminStaffProfileDetail = async (id, onSuccess, onError) => {
  await handleApiGetCall(`/member/${id}`, {}, onSuccess, onError)
}
export const SetTarget = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  await handleApiGetCall(`/target/${id}`, value, onSuccess, onError)
}

export const AddEmployee = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/member`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GiveFeedBack', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GiveFeedBack', err)
    onError && onError(err)
  }
}

export const EditEmployee = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/member`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GiveFeedBack', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GiveFeedBack', err)
    onError && onError(err)
  }
}
export const DeleteDepartment = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.delete(`/department/${id}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of DeleteDepartment', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - DeleteDepartment', err)
    onError && onError(err)
  }
}

export const DeleteJobRole = async (id, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.delete(`/role/${id}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of DeleteJobRole', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - DeleteJobRole', err)
    onError && onError(err)
  }
}
export const GetStaffAttendanceList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/attendance`, value, onSuccess, onError)
}

export const GetStaffLeaveList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/user/leave`, value, onSuccess, onError)
}

export const GetHolidayList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/holiday`, value, onSuccess, onError)
}

export const GetExpenseList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/team/expense`, value, onSuccess, onError)
}

export const GetExpenseTypeList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/expense`, value, onSuccess, onError)
}

export const CreateExpenseType = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/expense`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing response of CreateExpenseType', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - CreateExpenseType', err)
    onError && onError(err)
  }
}
export const UpdateExpenseType = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/expense`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing response of UpdateExpenseType', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - UpdateExpenseType', err)
    onError && onError(err)
  }
}
export const DeleteExpenseType = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.delete(`/expense/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing response of DeleteExpenseType', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - DeleteExpenseType', err)
    onError && onError(err)
  }
}
export const PaymentStatusUpdate = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.patch(
      `/expense/${value}?payment=true`,
      { status: 'DONE' },
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing response of PaymentStatusUpdate', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - PaymentStatusUpdate', err)
    onError && onError(err)
  }
}
export const StatusUpdate = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.patch(
      `/expense/${id}`,
      { status: value },
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of StatusUpdate', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - StatusUpdate', err)
    onError && onError(err)
  }
}

export const GetUsersAttendanceList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/attendanceofall`, value, onSuccess, onError)
}
export const AttendanceStatus = async (type, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(
      `/attendance?${type}=true`,
      {},
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of AttendanceStatus', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - AttendanceStatus', err)
    onError && onError(err)
  }
}
export const GetInquiryAnalytics = async (type, onSuccess, onError) => {
  await handleApiGetCall(`/dashboard/inquiry`, {}, onSuccess, onError)
}
export const GetSalesInquiry = async (type, onSuccess, onError) => {
  await handleApiGetCall(`/dashboard/sales/inquiry`, {}, onSuccess, onError)
}

export const GrantLeave = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(
      `/grant/leave/${value?.id}?isApproved=${value?.leaveStatus}`,
      {},
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of GrantLeave', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GrantLeave', err)
    onError && onError(err)
  }
}
