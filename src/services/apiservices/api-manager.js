import axiosInstance from './axios'
import Cookie from 'js-cookie'

export const handleApiGetCall = async (url, value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
        Authorization: `Barear ${Cookie.get('userToken')}`,
      },
      params: value,
    })
    console.log('Printing data of GetAdminClientDetail', data)
    onSuccess && onSuccess(data)
  } catch (err) {
    console.log('Got error while calling API - GetAdminClientDetail', err)
    onError && onError(err)
  }
}
