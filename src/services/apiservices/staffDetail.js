import {
  handleApiDeleteCall,
  handleApiGetCall,
  handleApiPatchCall,
  handleApiPostCall,
  handleApiPutCall,
} from './api-manager'
import axiosInstance from './axios'
import Cookie from 'js-cookie'
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
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
  await handleApiPostCall(`/target/${id}`, value, onSuccess, onError)
}

export const AddEmployee = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/member`, value, onSuccess, onError)
}

export const EditEmployee = async (value, onSuccess, onError) => {
  await handleApiPutCall(`/member`, value, onSuccess, onError)
}
export const DeleteJobRole = async (id, onSuccess, onError) => {
  await handleApiDeleteCall(`/role/${id}`, onSuccess, onError)
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
export const GetExpenseDetail = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/team/expense/${value}`, {}, onSuccess, onError)
}
export const GetExpenseTypeList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/expense`, value, onSuccess, onError)
}

export const CreateExpenseType = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/expense`, value, onSuccess, onError)
}
export const UpdateExpenseType = async (value, onSuccess, onError) => {
  await handleApiPutCall(`/expense`, value, onSuccess, onError)
}
export const DeleteExpenseType = async (value, onSuccess, onError) => {
  await handleApiDeleteCall(`/expense/${value}`, onSuccess, onError)
}
export const PaymentStatusUpdate = async (value, onSuccess, onError) => {
  await handleApiPatchCall(
    `/expense/${value}?payment=true`,
    { status: 'DONE' },
    onSuccess,
    onError,
  )
}

export const StatusUpdate = async (id, value, onSuccess, onError) => {
  await handleApiPatchCall(
    `/expense/${id}`,
    { status: value },
    onSuccess,
    onError,
  )
}
export const ApproveExpense = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.patch(`/team/approve/expense`, value, {
      headers: { ...defaultHeaders },
    })

    onSuccess && onSuccess(data)
  } catch (err) {
    console.log(err)
    onError && onError(err)
  }
}
export const PaymentStatus = async (value, onSuccess, onError) => {
  defaultHeaders.Authorization = `Barear ${Cookie.get('userToken')}`
  try {
    const { data } = await axiosInstance.patch(
      `/team/approve/expense/payment`,
      value,
      {
        headers: { ...defaultHeaders },
      },
    )

    onSuccess && onSuccess(data)
  } catch (err) {
    console.log(err)
    onError && onError(err)
  }
}
export const GetUsersAttendanceList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/attendanceofall`, value, onSuccess, onError)
}
export const AttendanceStatus = async (type, onSuccess, onError) => {
  await handleApiPutCall(`/attendance?${type}=true`, {}, onSuccess, onError)
}
export const GetInquiryAnalytics = async (type, onSuccess, onError) => {
  await handleApiGetCall(`/dashboard/inquiry`, {}, onSuccess, onError)
}
export const GetSalesInquiry = async (type, onSuccess, onError) => {
  await handleApiGetCall(`/dashboard/sales/inquiry`, {}, onSuccess, onError)
}

export const GrantLeave = async (value, onSuccess, onError) => {
  await handleApiPutCall(
    `/grant/leave/${value?.id}?isApproved=${value?.leaveStatus}`,
    {},
    onSuccess,
    onError,
  )
}

export const GetTeamMemberLocation = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/location/member`, value, onSuccess, onError)
}
