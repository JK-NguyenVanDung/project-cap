import { ISignUp } from './apiInterface'
export const API_URL = 'https://localhost:7206'
export const API_CONFIG = {
  AUTH: {
    LOGIN: '/api/Users/Login',
    SIGN_UP: '/api/Users',
  },
  COURSE_CATEGORY: {
    GET: '/api/Categories/getall',
    POST: '/api/Categories/Create',
    DELETE: (ID: number) => `/api/Categories/delete/${ID}`,
    PUT: (ID: number) => `/api/Categories/update/${ID}`,
  },
  ACCOUNT: {
    GET: '/api/Accounts',
    POST: '/api/Accounts',
    PUT: (ID: number) => `/api/Accounts/${ID}`,
  },
  ROLES: {
    GET: '/api/Roles/getall',
  },
}
