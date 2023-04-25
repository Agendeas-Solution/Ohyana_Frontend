import { handleApiGetCall, handleApiPutCall } from './api-manager'

export const GetCompanyProfile = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/company`, value, onSuccess, onError)
}

export const editCompanyProfile = async (value, onSuccess, onError) => {
  await handleApiPutCall(`/company`, value, onSuccess, onError)
}
