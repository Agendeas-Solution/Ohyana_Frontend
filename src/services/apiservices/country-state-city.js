import { handleApiCountryStateCityGetCall } from './api-manager'

export const GetState = async (value, onSuccess, onError) => {
  await handleApiCountryStateCityGetCall(
    `/countries/IN/states`,
    onSuccess,
    onError,
  )
}
export const GetCity = async (value, onSuccess, onError) => {
  await handleApiCountryStateCityGetCall(
    `/countries/IN/states` + value,
    onSuccess,
    onError,
  )
}
