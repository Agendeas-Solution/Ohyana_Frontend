import {
  handleApiGetCall,
  handleApiPatchCall,
  handleApiPostCall,
  handleApiDeleteCall,
} from './api-manager'

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

export const GetAllCartItems = async (id, value, onSuccess, onError) => {
  await handleApiGetCall(`/cart/items/${id}`, value, onSuccess, onError)
}
export const PlaceOrders = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/placeorder`, value, onSuccess, onError)
}
export const DispatchOrder = async (id, value, onSuccess, onError) => {
  await handleApiPatchCall(
    `/delivery/${id}`,
    value.paymentDetail,
    onSuccess,
    onError,
  )
}
export const DeleteMyCartProduct = async (id, onSuccess, onError) => {
  await handleApiDeleteCall(`/cart/items/${id}`, onSuccess, onError)
}
