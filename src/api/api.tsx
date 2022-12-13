import { ISignUp } from './apiInterface';
export const API_URL = 'https://localhost:7206';
//https://cntttest.vanlanguni.edu.vn:18081/CP25Team02
export const API_CONFIG = {
  AUTH: {
    LOGIN: '/api/Accounts/Login',
    GET_PROFILE: '/api/Accounts/me',
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
    GET_SINGLE: (ID: number) => `/api/Programs/${ID}`,

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
    DELETE_ANSWER: (id: number) => `/api/Questions/content/${id}`,
  },
  ACADEMIC_YEAR: {
    GET: '/api/AcademicYear',
  },
  POSITION: {
    GET: '/api/Positions',
  },
  CONTENT_PROGRAM: {
    GET: (id: number) => `/api/Programs/${id}/Contents`,
  },
  CONTENT: {
    POST: '/api/Contents',
    GET: (id: number) => `/api/Contents/${id}`,
    PUT: (id: number) => `/api/Contents/${id}`,
    DELETE: (id: number) => `/api/Contents/${id}`,
  },
  CHAPTER: {
    GET: (id: number) => `/api/Contents/${id}`,
    DEL: (id: number) => `/api/Contents/${id}`,
    PUT: (id: number) => `/api/Contents/${id}`,
    POST: `/api/Contents`,
  },
  REVIEWER: {
    GET: (id: number) => `/api/ReviewPrograms/${id}`,
    GET_ALL: `/api/ReviewPrograms`,
    POST: `/api/ReviewPrograms/reviewer`,
  },
};
