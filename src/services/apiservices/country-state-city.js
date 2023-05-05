import { handleApiCountryStateCityGetCall } from './api-manager'

export const GetState = async (value, onSuccess, onError) => {
  await handleApiCountryStateCityGetCall(
    `/countries/IN/states`,
    onSuccess,
    onError,
  )
}
export const GetStateByCountry = async (value, onSuccess, onError) => {
  await handleApiCountryStateCityGetCall(
    `/countries/${value}/states`,
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
export const GetCityByStates = async (value, onSuccess, onError) => {
  await handleApiCountryStateCityGetCall(
    `/countries/` + value,
    onSuccess,
    onError,
  )
}
export const GetCountryList = async (id, onSuccess, onError) => {
  await handleApiCountryStateCityGetCall(`/countries`, onSuccess, onError)
}
