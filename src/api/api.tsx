import { ISignUp } from './apiInterface';
export const API_URL = 'https://localhost:7206';
//https://cntttest.vanlanguni.edu.vn:18081/CP25Team02
export const API_CONFIG = {
  AUTH: {
    LOGIN: '/api/Accounts/Login',
    GET_PROFILE: '/api/Accounts/me',
    POST_PROFILE: ``,
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
    PUT_FORM: '/api/Accounts/me',
  },
  ROLES: {
    GET: '/api/Roles/getall',
  },
  PROGRAM: {
    GET: '/api/Programs',
    GET_SINGLE: (ID: number) => `/api/Programs/${ID}`,
    GET_CONTENT: (ids: { programId: number; accountId: number }) =>
      `/api/Programs/Contents?ProgramId=${ids.programId}&AccountId=${ids.accountId}`,
    POST: '/api/Programs',
    DELETE: (ID: number) => `/api/Programs/${ID}`,
    PUT: (ID: number) => `/api/Programs/${ID}`,

    GET_REVIEW: '/api/ReviewPrograms',

    SET_STATUS: (id: number) => `/api/Programs/${id}/Status`,

    LIKE: (id: number, isLike: boolean) =>
      `/api/Programs/${id}/LikeProgram?isLike=${isLike}`,
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
    POST: '/api/AcademicYear',
    PUT: (id: number) => `/api/AcademicYear/${id}`,
    DEL: (id: number) => `/api/AcademicYear/${id}`,
  },
  POSITION: {
    GET: '/api/Positions',
    POST: '/api/Positions',
    PUT: (id: number) => `/api/Positions/${id}`,
    DEL: (id: number) => `/api/Positions/${id}`,
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
    GET_LIST_PROGRAM: (id: number) => `api/ReviewPrograms/listprogram/${id}`,
    POST: `/api/ReviewPrograms/reviewer`,
    APPROVE: `/api/ReviewPrograms/approve`,
    HISTORY: (idProgram: number) =>
      `/api/ReviewPrograms/listapproved/${idProgram}?id=${idProgram}`,
  },
  CHECK_PROGRAM: {
    GET_QUESTION_COUNT: (testId: number) =>
      `/api/ReviewPrograms/numberquestion/${testId}`,
    GET_CHAPTER_COUNT: (programId: number) =>
      `/api/ReviewPrograms/numbercontent/${programId}`,
    GET_PROGRAM_STATUS: (programId: number) =>
      `/api/ReviewPrograms/status/${programId}`,
  },
};
