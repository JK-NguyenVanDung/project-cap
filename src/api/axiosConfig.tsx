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
    encode: (params) => queryString.stringify(params),
  },
})

axiosConfig.interceptors.request.use(async (config) => {
  const customHeaders = {}

  // let auth = localStorage.getItem('Bearer')
  // let stringParse = JSON.parse(auth);
  // const accessToken = JSON.parse(stringParse.auth).token;

  // if (auth) {
  // }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  }
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
    // console.log({
    //   baseUrl: config.baseURL,
    //   url: config.url,
    //   method: config.method,
    //   body: config.data, //&& JSON.parse(config.data)
    //   response: data.error,
    //   token: config.headers && config.headers.Authorization,
    // });

    if (error.response.data.error.message) {
      throw error.response.data.error.message
    }
    throw error
  }
)

// axiosConfig.interceptors.request.use(async (config) => {
//   try {
//     const acceptToken: any = {}
//     const token = await localStorage.getItem('Bearer')
//     if (token) acceptToken.Authorization = token
//     return {
//       ...config,
//       headers: {
//         ...acceptToken,
//         ...config.headers,
//       },
//     }
//   } catch (error) {}
// })
// axiosConfig.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data
//     }
//     return response
//   },
//   (error) => {
//     // Handle errors
//     console.log(error.response)

//     if (error.message) {
//       throw error.message
//     }
//     if (error.response?.status === 401) {
//       localStorage.clear()
//     }
//     if (error.response?.status === 404) {
//       localStorage.clear()
//     }
//     throw error
//   }
// )
export default axiosConfig
