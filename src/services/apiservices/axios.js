import axios from 'axios'

const instance = axios.create({
  // baseURL: process.env.REACT_APP_API_CALL_URL
  // baseURL: 'http://192.168.1.65:9009',
  baseURL:"http://localhost:9009"
})

export default instance
