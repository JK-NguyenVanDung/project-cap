import { ISignUp } from './apiInterface'
export const API_CONSTANTS = {
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
}
