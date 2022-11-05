import { ISignUp } from './apiInterface'
export const API_URL = 'http://cntttest.vanlanguni.edu.vn:18080/CP25Team02/'
export const API_CONFIG = {
  AUTH: {
    LOGIN: '/api/Users/Login',
    SIGN_UP: '/api/Users',
  },
  COURSE_CATEGORY: {
    GET: '/api/categories/getall',
    POST: '/api/categories/create',
    DELETE: (ID: number) => `/api/categories/delete/${ID}`,
    PUT: (ID: number) => `/api/categories/edit/${ID}`,
  },
  VALUES: {
    GET: 'api/Values',
  },
}
