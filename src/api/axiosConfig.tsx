import axios, { AxiosRequestConfig } from 'axios'
import queryString from 'query-string'
import { API_URL } from './api'

const axiosConfig = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    encode: (params) => {
      console.log(params)
      queryString.stringify(params)
    },
  },
})

axiosConfig.interceptors.request.use(async (config) => {
  try {
    const acceptToken: any = {}
    const token = await localStorage.getItem('Bearer')
    if (token) acceptToken.Authorization = token
    return {
      ...config,
      headers: {
        ...acceptToken,
        ...config.headers,
      },
    }
  } catch (error) {}
})
axiosConfig.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    // Handle errors
    console.log(error.response)

    if (error.message) {
      throw error.message
    }
    if (error.response?.status === 401) {
      localStorage.clear()
    }
    if (error.response?.status === 404) {
      localStorage.clear()
    }
    throw error
  }
)
export default axiosConfig
