import axiosInstance from './axios'
import Cookie from 'js-cookie'
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetAdminStaffDetailList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get('/member', {
      headers: { ...defaultHeaders },
      params: value,
    })
    console.log('Printing data of GetAdminProfile', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminProfile', err)
    onError && onError(err)
  }
}
export const GetAdminStaffProfileDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/member/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetAdminStaffProfileDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminStaffProfileDetail', err)
    onError && onError(err)
  }
}

export const GetAdminStaffRatingDetail = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/feedback/member/${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetAdminStaffRatingDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminStaffRatingDetail', err)
    onError && onError(err)
  }
}

export const GiveFeedBack = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.post(`/feedback/member`, value, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GiveFeedBack', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GiveFeedBack', err)
    onError && onError(err)
  }
}
export const GetAllStaffList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/member`, {
      headers: { ...defaultHeaders },
      params: { admin: true },
    })
    console.log('Printing data of GetAllStaffList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAllStaffList', err)
    onError && onError(err)
  }
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

export const EditEmployee = async (id, value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.put(`/member/${id}`, value, {
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
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(
      `/attendance?teamId=${parseInt(value)}`,
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of GetStaffAttendanceList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetStaffAttendanceList', err)
    onError && onError(err)
  }
}
export const GetStaffLeaveList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`user/leave?teamId=${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetStaffLeaveList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetStaffLeaveList', err)
    onError && onError(err)
  }
}
export const GetHolidayList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/holiday`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetHolidayList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetHolidayList', err)
    onError && onError(err)
  }
}
export const GetExpenseList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/team/expense?teamId=${value}`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetExpenseList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetExpenseList', err)
    onError && onError(err)
  }
}
export const GetExpenseTypeList = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/expense`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing response of GetExpenseList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetExpenseList', err)
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
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(
      `/attendanceofall?month=${value?.month}&year=${value?.year}`,
      {
        headers: { ...defaultHeaders },
      },
    )
    console.log('Printing data of GetExpenseList', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetExpenseList', err)
    onError && onError(err)
  }
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
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/dashboard/inquiry`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetInquiryAnalytics', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetInquiryAnalytics', err)
    onError && onError(err)
  }
}
export const GetSalesInquiry = async (type, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.get(`/dashboard/sales/inquiry`, {
      headers: { ...defaultHeaders },
    })
    console.log('Printing data of GetSalesInquiry', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetSalesInquiry', err)
    onError && onError(err)
  }
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
