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

export const handleApiPostCall = async (url, value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.post(url, value, {
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
        Authorization: `Barear ${Cookie.get('userToken')}`,
      },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}

export const handleApiPutCall = async (url, value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.put(url, value, {
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
        Authorization: `Barear ${Cookie.get('userToken')}`,
      },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}

export const handleApiPatchCall = async (url, value, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.patch(url, value, {
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
        Authorization: `Barear ${Cookie.get('userToken')}`,
      },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}

export const handleApiDeleteCall = async (url, onSuccess, onError) => {
  try {
    const { data } = await axiosInstance.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
        Authorization: `Barear ${Cookie.get('userToken')}`,
      },
    })
    onSuccess && onSuccess(data)
  } catch (err) {
    onError && onError(err)
  }
}
