import {
  handleApiDeleteCall,
  handleApiGetCall,
  handleApiPatchCall,
  handleApiPostCall,
  handleApiPutCall,
} from './api-manager'
import Cookie from 'js-cookie'
const defaultHeaders = {
  'Content-Type': 'application/json',
  withCredentials: true,
  Authorization: `Barear ${Cookie.get('userToken')}`,
}
export const GetAdminProfile = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/profile`, value, onSuccess, onError)
}

export const GetNotification = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/notification`, value, onSuccess, onError)
}

export async function EditAdminProfile(formData, onSuccess, onError) {
  await handleApiPutCall(`/profile`, formData, onSuccess, onError)
}

export const GetAdminAppointmentOrReminder = async (
  value,
  onSuccess,
  onError,
) => {
  await handleApiGetCall(`/appointmentOrReminder`, value, onSuccess, onError)
}

export const GetAdminDepartmentList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/department`, value, onSuccess, onError)
}

export const GetAdminProductList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/product`, value, onSuccess, onError)
}
export const GetAdminProductListReport = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/product?selection=true`, value, onSuccess, onError)
}

export const DeleteAdminProduct = async (value, onSuccess, onError) => {
  await handleApiDeleteCall(`/product/${value}`, onSuccess, onError)
}

export const AddToCart = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/addtocart`, value, onSuccess, onError)
}

export const AddAdminProduct = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/product`, value, onSuccess, onError)
}
export const UpdateProductQuantity = async (id, value, onSuccess, onError) => {
  await handleApiPatchCall(`/product/${id}`, value, onSuccess, onError)
}
export const EditAdminProduct = async (value, id, onSuccess, onError) => {
  await handleApiPutCall(`/product/${id}`, value, onSuccess, onError)
}

export const AddCalendarAppointment = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/appointmentOrReminder`, value, onSuccess, onError)
}

export const EditCalendarAppointment = async (
  id,
  value,
  onSuccess,
  onError,
) => {
  await handleApiPutCall(
    `/appointmentOrReminder/${id}`,
    value,
    onSuccess,
    onError,
  )
}

export const DeleteAppointment = async (value, onSuccess, onError) => {
  await handleApiDeleteCall(`/appointment/client/${value}`, onSuccess, onError)
}

export const DeleteReminder = async (value, onSuccess, onError) => {
  await handleApiDeleteCall(`/reminder/client/${value}`, onSuccess, onError)
}
export const GetAdminRole = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/role`, value, onSuccess, onError)
}

export const GetSingleRole = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/role/detail`, value, onSuccess, onError)
}

export const UpdateClockInOut = async (value, onSuccess, onError) => {
  await handleApiPutCall(`/clockin-out`, value, onSuccess, onError)
}
export const UpdateRoleExpensePermissions = async (
  value,
  onSuccess,
  onError,
) => {
  await handleApiPutCall(`/expense/permissions`, value, onSuccess, onError)
}
export const CreateJobRole = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/role`, value, onSuccess, onError)
}
export const EditJobRole = async (id, value, onSuccess, onError) => {
  await handleApiPutCall(`/role/${id}`, value, onSuccess, onError)
}

export const AddClientStatus = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/status/client`, value, onSuccess, onError)
}

export const AddCloseStatusApiCall = async (value, onSuccess, onError) => {
  await handleApiPatchCall(`/client/status/closed`, value, onSuccess, onError)
}

export const EditClientStatus = async (value, onSuccess, onError) => {
  await handleApiPutCall(`/status/client`, value, onSuccess, onError)
}

export const AddClientDetail = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/client`, value, onSuccess, onError)
}
export const EditClientDetail = async (clientId, value, onSuccess, onError) => {
  await handleApiPutCall(`/client/${clientId}`, value, onSuccess, onError)
}

export const AddNotificationDetail = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/notification`, value, onSuccess, onError)
}

export const UpdatePermission = async (formData, onSuccess, onError) => {
  await handleApiPutCall(`/permissions`, formData, onSuccess, onError)
}

export const getUserPermissions = async (id, onSuccess, onError) => {
  await handleApiGetCall(`/permissions/${id}`, {}, onSuccess, onError)
}
export const UpdateClientStage = async (formData, onSuccess, onError) => {
  await handleApiPutCall(`/stage/permissions`, formData, onSuccess, onError)
}
