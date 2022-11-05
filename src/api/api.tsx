import { ISignUp } from './apiInterface'
export const API_URL = 'http://cntttest.vanlanguni.edu.vn:18080/CP25Team02/'
export const API_CONFIG = {
  AUTH: {
    LOGIN: '/api/Users/Login',
    SIGN_UP: '/api/Users',
  },
  COURSE_CATEGORY: {
    GET: '/api/categoris/getall',
    POST: '/api/categoris/create',
    DELETE: (id: number) => `/api/categoris/delete/${id}`,
    PUT: (id: number) => `/api/categoris/edit/${id}`,
  },
  VALUES: {
    GET: 'api/Values',
  },
}
