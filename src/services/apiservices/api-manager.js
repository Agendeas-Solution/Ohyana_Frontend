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
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}
