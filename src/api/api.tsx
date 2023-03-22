import { IGift, ISignUp } from './apiInterface';
import { apiPath } from '../onBuild';
export const API_URL = apiPath;
//https://cntttest.vanlanguni.edu.vn:18081/SEP25Team17
//https://localhost:7206'
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
    DEL: (id: number) => `/api/Accounts/${id}`,
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
    MY_PROGRAMS: (accountId: number) =>
      `/api/MyPrograms/GetListMyProgram/?idAccount=${accountId}`,

    MY_APPLICATIONS: '/api/Learners/MyApplications',
    GETPROGRAMPUBLISH: '/api/Learners/GetListProgram',
    LIST_MY_FINISH_PROGRAM: (idAccount: number) =>
      `/api/MyPrograms/GetListMyFinishProgram?idAccount=${idAccount}`,
    PROGRAM_RESULT: (idAccount: number, idProgram: number) =>
      `/api/MyPrograms/GetProgramResult?idAccount=${idAccount}&idProgram=${idProgram}`,
    SORT_CHAPTER: '/api/Programs/Chapter',
    GET_CERTIFICATE: (idAccount: number, idProgram: number) =>
      `/api/MyPrograms/GetCertificate?idAccount=${idAccount}&idProgram=${idProgram}`,
    GET_PROGRAM_COMPLETE: (idAccount: number) =>
      `/api/MyPrograms/GetListMyCompleteProgram?idAccount=${idAccount}`,

    GETPUBLICPROGRAMS: '/api/Programs/Public',
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
    DO_TEST: (accountId: number) => `/api/DoTests/${accountId}`,
    CHECK_PASSED: (accountId: number, testId: number) =>
      `/api/DoTests/CheckScore/?idAccount=${accountId}&idTest=${testId}`,
    GET_SCORE: (ids: { accountId: number; testId: number }) =>
      `/api/DoTests/SocreTest/?idAccount=${ids.accountId}&idTest=${ids.testId}`,
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
    GET_IF_PROGRAM_IS_REGISTERED: (programId: number, accountId: number) =>
      `/api/MyPrograms/ProgramRegistered/?idAccount=${accountId}&idProgram=${programId}`,
  },
  LEARNER: {
    REGISTER_OR_UN: `/api/Learners/RegisterOrUnRegister`,

    GETLEANER_ID: (id: number) => `/api/Learners/GetListLearner/${id}`,

    ADD_LEANER: `/api/Learners/AddLearner`,

    UPDATE_LEANER: (id: number) => `/api/Learners/UpdateLearner/${id}`,

    IMPORT_FILE: (idAccount: number) => `/api/Learners/Import/${idAccount}`,
    DELLEANER: (id: number) => `/api/Learners/${id}`,
    APPLICATION_PROGRAM: (id: number) =>
      `/api/Learners/Applications?ProgramId=${id}`,
    REFUSE: (id: number) => `/api/Learners/Applications/${id}/Refuse`,
    APPROVE: (id: number) => `/api/Learners/Applications/${id}/Approve`,
  },

  COMMENT: {
    GET_COMMENT: (idProgram: number) => `/api/Comments/${idProgram}`,
    SENT_COMMENT: `/api/Comments`,
    DELETE_COMMENT: (idComment: number) => `/api/Comments/${idComment}`,
  },
  ATTENDANCES: {
    GET_ATTENDANCES: (idProgram: number) =>
      `/api/Attendances/Programs/${idProgram}`,
    GET_ID_ATTENDANCES: (id: number) => `/api/Attendances/${id}`,
    POST_ATTENDANCES: `/api/Attendances`,
    PUT_ATTENDANCES: (id: number) => `/api/Attendances/${id}`,
    DEL_ATTENDANCES: (id: number) => `/api/Attendances/${id}`,
    ATTENDANCES_EMAIL: '/api/Attendances/Attendances/Email',
    ATTENDANCES_CODE: '/api/Attendances/Attendances/Code',
    NOT_ATTENDANCE: (id: number) => `/api/Attendances/NotAttendance/${id}`,
  },
  SURVEY: {
    GETALL: '/api/Surveys/GetListSurvey',
    GET_LIST_PROGRAM: '/api/Surveys/GetListProgram',

    GET_PUBLIC: '/api/Surveys/GetListSurveyPublish',
    GET_SURVEY: (idSurvey: number) => `/api/Surveys/GetSurvey/${idSurvey}`,
    GET_MY_SURVEYS: (idAccount: number) =>
      `/api/Surveys/GetListSurvey/${idAccount}`,
    GET_LIST_ACCOUNT_SURVEY: (idSurvey: number) =>
      `/api/Surveys/GetListAccountSurvey/${idSurvey}`,
    GET_LIST_SURVEY_ANSWERS: (idSurvey: number, idAccount: number) =>
      `/api/Surveys/GetListAnswers/?idSurvey=${idSurvey}&idAccount=${idAccount}`,
    GET_PROGRAM_STATISTIC: (idProgram: number) =>
      `/api/Surveys/GetStaticsProgram/${idProgram}`,
    CHECK_DONE_SURVEY: (idProgram: number, idAccount: number) =>
      `/api/Surveys/CheckSurvey/?idProgram=${idProgram}&idAccount=${idAccount}`,

    GET_QUESTIONS: (idQuestion: number) =>
      `/api/Surveys/GetListQuestion/${idQuestion}`,
    CREATE_SURVEY: '/api/Surveys/CreateSurvey',
    DO_SURVEY: '/api/Surveys/DoSurvey',
    DO_PROGRAM_SURVEY: '/api/Surveys/SurveyProgram',

    CREATE_QUESTION: '/api/Surveys/CreateQuestion',
    PUBLISH_SURVEY: (surveyId: number) =>
      `/api/Surveys/PublishSurvey/${surveyId}`,
    UPDATE_SURVEY: (surveyId: number) =>
      `/api/Surveys/UpdateSurvey/${surveyId}`,
    UPDATE_QUESTION: (questionId: number) =>
      `/api/Surveys/UpdateQuestion/${questionId}`,
    DELETE_SURVEY: (surveyId: number) =>
      `/api/Surveys/DeleteSurvey/${surveyId}`,
    DELETE_QUESTION: (questionId: number) =>
      `/api/Surveys/DeleteQuestion/${questionId}`,
    DELETE_CONTENT: (contentId: number) =>
      `/api/Surveys/DeleteContent/${contentId}`,
  },
  STATISTIC: {
    GET_PROGRAM_RESULT: (programId: number) =>
      `/api/ProgramResults/${programId}`,
    GET_FACULTY_STATISTIC: (academicYearId: number) =>
      `/api/Statistics/StatisticsOfFaculty/${academicYearId}`,
    GET_CATEGORY_STATISTIC: (academicYearId: number) =>
      `/api/Statistics/StatisticsOfCategory/${academicYearId}`,
    GET_DASHBOARD: `/api/Dashboard`,
    GET_MY_STATISTIC: (accountId: number) =>
      `/api/Statistics/GetMyStatistics?accId=${accountId}`,
  },
  GIFT: {
    GET_ALL_GIFTS: '/api/Gifts',
    POST_GIFT: `/api/Gifts`,
    GET_GIFT: (idGift: number) => `/api/Gifts/${idGift}`,
    UPDATE_GIFT: (idGift: number) => `/api/Gifts/${idGift}`,
    DELETE_GIFT: (idGift: number) => `/api/Gifts/${idGift}`,
    GET_EXCHANGE: `/api/Gifts/GetExchange`,
    CHANGE_STATUS: `/api/Gifts/ChangeStatus`,
    POST_EXCHANGE: '/api/Gifts/Exchange',
  }
  EXCHANGE: {
    GET: `/api/Exchanges/GetListExchanges`,
    GET_LEARNER: (AccountId: number) =>
      `/api/Exchanges/GetListExchangesInLearner?AccountId=${AccountId}`,
    POST: `/api/Exchanges/CreateExchange`,
    PUT: (exChangeId: number) => `/api/Exchanges/UpdateExchange/${exChangeId}`,
    DELETE: (exChangeId: number) =>
      `/api/Exchanges/DeleteExchange/${exChangeId}`,
    GET_DETAIL: (exChangeId: number, accountId: number) =>
      `/api/Exchanges/GetDetailExchange?AccountId=${accountId}&ExchangeId=${exChangeId}`,
    ADD_IMG: `/api/Exchanges/AddPhoto`,

    UPDATE_IMG: (id: number) => `/api/Exchanges/UpdatePhoto?Id=${id}`,
    GET_CERTIFICATIONS: (exChangeId: number) =>
      `/api/Exchanges/GetCertificatePhotos/${exChangeId}`,
    DENY: `/api/Exchanges/RefuseCertificatePhoto`,
    APPROVE: `/api/Exchanges/ApproveCertificatePhoto`,
  },
};
