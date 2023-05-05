import {
  handleApiDeleteCall,
  handleApiGetCall,
  handleApiPostCall,
  handleApiPutCall,
} from './api-manager'

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
  await handleApiDeleteCall(`/client/${value}`, onSuccess, onError)
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
  await handleApiPutCall(`/pjp`, value, onSuccess, onError)
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
  await handleApiPostCall(`/status/client/`, value, onSuccess, onError)
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
  await handleApiPostCall(`/reminder/client`, value, onSuccess, onError)
}
export const EditAdminClientReminderDetail = async (
  value,
  onSuccess,
  onError,
) => {
  await handleApiPutCall(`/reminder/client`, value, onSuccess, onError)
}

export const AddAdminClientAppointmentDetail = async (
  value,
  onSuccess,
  onError,
) => {
  await handleApiPostCall(`/appointment/client`, value, onSuccess, onError)
}
export const EditAdminClientAppointmentDetail = async (
  value,
  onSuccess,
  onError,
) => {
  await handleApiPutCall(`/appointment/client`, value, onSuccess, onError)
}

export const GetAdminClientAppointmentDetail = async (
  id,
  value,
  onSuccess,
  onError,
) => {
  await handleApiGetCall(`/appointment/client/${id}`, value, onSuccess, onError)
}

export const EditClientStage = async (id, value, onSuccess, onError) => {
  await handleApiPutCall(`/stage/client/${id}`, value, onSuccess, onError)
}

export const CustomerTake = async (id, onSuccess, onError) => {
  await handleApiPutCall(`/take/client/${id}`, {}, onSuccess, onError)
}

export const GetBusinessDetail = async (id, onSuccess, onError) => {
  await handleApiGetCall(`/businesscard/${id}`, {}, onSuccess, onError)
}

export const DeleteBusinessCard = async (id, onSuccess, onError) => {
  await handleApiDeleteCall(`/businesscard/${id}`, onSuccess, onError)
}
