import { ISignUp } from './apiInterface';
export const API_URL = 'https://localhost:7206';
export const API_CONFIG = {
  AUTH: {
    LOGIN: '/api/Accounts/Login',
    GETPROFILE: '/api/Accounts/me',
  },
  COURSE_CATEGORY: {
    GET: '/api/Categories/',
    POST: '/api/Categories/Create',
    DELETE: (ID: number) => `/api/Categories/${ID}`,
    PUT: (ID: number) => `/api/Categories/${ID}`,
  },
  ACCOUNT: {
    GET: '/api/Accounts',
    POST: '/api/Accounts',
    PUT: (ID: number) => `/api/Accounts/${ID}`,
  },
  ROLES: {
    GET: '/api/Roles/getall',
  },
  PROGRAM: {
    GET: '/api/Programs',
    POST: '/api/Programs',
    DEL: (ID: number) => `/api/Programs/${ID}`,
    PUT: (ID: number) => `/api/Programs/${ID}`,
  },
  FACULTIES: {
    GET: '/api/Faculties',
    POST: '/api/Faculties',
    PUT: (id: number) => `/api/Faculties/${id}`,
    DEL: (id: number) => `/api/Faculties/${id}`,
  },
};
