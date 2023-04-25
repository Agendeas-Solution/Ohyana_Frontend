import { handleApiGetCall, handleApiPatchCall } from './api-manager'

export const GetSingleClientOrderList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/orders`, value, onSuccess, onError)
}

export const GetOrderDetail = async (id, value, onSuccess, onError) => {
  await handleApiGetCall(`/orderitems/${id}`, value, onSuccess, onError)
}

export const UpdatePaymentStatus = async (value, onSuccess, onError) => {
  await handleApiPatchCall(
    `/payment/${value.orderId}`,
    value.paymentDetail,
    onSuccess,
    onError,
  )
}
