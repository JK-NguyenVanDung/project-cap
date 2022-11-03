import { ISignUp } from './apiInterface'
export const API_URL =
  'http://cntttest.vanlanguni.edu.vn:18080/CP25Team02/Help/'
export const API_CONFIG = {
  AUTH: {
    LOGIN: '/api/Users/Login',
    SIGN_UP: '/api/Users',
  },
  COURSE_CATEGORY: {
    GET: '/api/categorys/getall',
    POST: '/api/categorys/create',
    DELETE: (id: number) => `/api/categorys/delete/${id}`,
    PUT: (id: number) => `/api/categorys/edit/${id}`,
  },
  VALUES: {
    GET: 'api/Values',
  },
}
