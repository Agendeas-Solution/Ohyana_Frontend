import { handleApiGetCall, handleApiPostCall } from './api-manager'

export const GetPJPList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/pjp`, value, onSuccess, onError)
}
export const GetTargetList = async (value, onSuccess, onError) => {
  await handleApiGetCall(
    `/targets/${value.teamId}`,
    {
      month: value.month,
      year: value.year,
    },
    onSuccess,
    onError,
  )
}

export const CreatePJP = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/pjp`, value, onSuccess, onError)
}
export const CompletePJPStatus = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/complete/pjp`, value, onSuccess, onError)
}
export const GetPJPDetail = async (id, onSuccess, onError) => {
  await handleApiGetCall(`/pjp/${id}`, {}, onSuccess, onError)
}
