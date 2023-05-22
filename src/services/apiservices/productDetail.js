import { handleApiGetCall, handleApiPostCall } from './api-manager'

export const GetProductDetail = async (id, value, onSuccess, onError) => {
  await handleApiGetCall(`/product/${id}`, value, onSuccess, onError)
}
export const GetProductReport = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/report/product`, value, onSuccess, onError)
}
export const GetCustomerReport = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/report/customers`, value, onSuccess, onError)
}
export const GetCityProductReport = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/report/city`, value, onSuccess, onError)
}

export const GetTeamReport = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/report/team`, value, onSuccess, onError)
}
