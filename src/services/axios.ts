import axios from 'axios'

const { VITE_API_BASE_URL, VITE_X_API_KEY } = import.meta.env

const axiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL || 'https://api.thecatapi.com/v1',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers['x-api-key'] = VITE_X_API_KEY
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosInstance
