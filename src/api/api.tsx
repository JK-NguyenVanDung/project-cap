import { ISignUp } from './apiInterface';
export const API_URL = 'https://localhost:7206';
export const API_CONFIG = {
  AUTH: {
    LOGIN: '/api/Accounts/Login',
    GETPROFILE: '/api/Accounts/me',
  },
  COURSE_CATEGORY: {
    GET: '/api/Categories/',
    POST: '/api/Categories/',
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
    DELETE: (ID: number) => `/api/Programs/${ID}`,
    PUT: (ID: number) => `/api/Programs/${ID}`,
  },
  FACULTIES: {
    GET: '/api/Faculties',
    POST: '/api/Faculties',
    PUT: (id: number) => `/api/Faculties/${id}`,
    DELETE: (id: number) => `/api/Faculties/${id}`,
  },
  QUESTION_TYPE: {
    GET: '/api/Types',
  },
  TEST: {
    GET: '/api/Tests',
    POST: '/api/Tests',
    PUT: (id: number) => `/api/Tests/${id}`,
    DELETE: (id: number) => `/api/Tests/${id}`,
  },
  QUESTION: {
    GET: '/api/Questions',
    POST: '/api/Questions',
    PUT: (id: number) => `/api/Questions/${id}`,
    DELETE: (id: number) => `/api/Questions/${id}`,
  },
  ACEDEMICYEAR: {
    GET: '/api/AcademicYear',
  },
  POSITION: {
    GET: '/api/Positions',
  },
  CONTENTPROGRAM: {
    GET: (id: number) => `/api/Programs/${id}/Contents`,
  },
  CHAPPTER: {
    GET: (id: number) => `/api/Contents/${id}`,
    DEL: (id: number) => `/api/Contents/${id}`,
    PUT: (id: number) => `/api/Contents/${id}`,
    POST: `/api/Contents`,
  },
};
