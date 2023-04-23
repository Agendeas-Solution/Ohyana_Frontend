import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.1.109:9009',
  // baseURL: 'http://192.168.91.158:9009',
  // baseURL:"http://localhost:9009"
})

export default instance
