import {
  handleApiDeleteCall,
  handleApiGetCall,
  handleApiPostCall,
  handleApiPutCall,
} from './api-manager'

export const GetAllHoliday = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/holiday`, value, onSuccess, onError)
}

export const GetAllLeaveType = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/leave`, value, onSuccess, onError)
}
export const ApplyLeave = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/apply/leave`, value, onSuccess, onError)
}

export const CreateHoliday = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/holiday`, value, onSuccess, onError)
}

export const UpdateHoliday = async (id, holidayDetail, onSuccess, onError) => {
  await handleApiPutCall(`/holiday/${id}`, holidayDetail, onSuccess, onError)
}

export const DeleteHoliday = async (id, onSuccess, onError) => {
  await handleApiDeleteCall(`/holiday/${id}`, onSuccess, onError)
}

export const CreateLeaveType = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/leave`, value, onSuccess, onError)
}

export const DeleteLeaveType = async (value, onSuccess, onError) => {
  await handleApiDeleteCall(`/leave/${value}`, onSuccess, onError)
}

export const UpdateLeaveType = async (id, value, onSuccess, onError) => {
  await handleApiPutCall(`/leave/${id}`, value, onSuccess, onError)
}
