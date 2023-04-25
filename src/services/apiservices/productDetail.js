import { handleApiGetCall, handleApiPostCall } from './api-manager'

export const GetProductDetail = async (id, value, onSuccess, onError) => {
  await handleApiGetCall(`/product/${id}`, value, onSuccess, onError)
}

export const GetProductReport = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/report/product`, value, onSuccess, onError)
}

export const GetTeamReport = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/report/team`, value, onSuccess, onError)
}
