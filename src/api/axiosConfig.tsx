import axios, { AxiosRequestConfig } from 'axios'
import queryString from 'query-string'

import { API_URL } from '../Type'

const axiosConfig = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  },
  // paramsSerializer: (params: any) => queryString.stringify(params),
})

axiosConfig.interceptors.request.use(async ({ config }: any) => {
  try {
    const acceptToken = {
      Authorization: '',
    }
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
    const { config, data } = error.response
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
