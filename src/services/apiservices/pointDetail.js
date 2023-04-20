import { handleApiGetCall, handleApiPostCall } from './api-manager'

export const GetPointRule = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/points/rules`, value, onSuccess, onError)
}
export const GetPointTeamMember = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/points`, value, onSuccess, onError)
}
export const GiveAppreciation = async (id, onSuccess, onError) => {
  await handleApiPostCall(`/appreciation/points/${id}`, {}, onSuccess, onError)
}
