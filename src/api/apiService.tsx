import { API_CONFIG } from './api';
import axiosConfig, { configFormData } from './axiosConfig';
import {
  IADDEXCHANGE,
  ICategory,
  IChapter,
  IGift,
  IGIFTSTATUS,
} from './apiInterface';
import {
  IAccountItem,
  IExchangeCoin,
  IProgramItem /* IQuestion, ITest  */,
  IQuestion,
  ISurveyAnswer,
  ISurveyItem,
  ISurveyProgram,
  ISurveyQuestion,
  ITest,
} from '../Type';
export default {
  //auth
  postAdminUser: (token: any) => {
    return axiosConfig.post(API_CONFIG.AUTH.LOGIN, token);
  },
  getProfile: () => {
    return axiosConfig.get(API_CONFIG.AUTH.GET_PROFILE);
  },
  //CATEGORY
  getCategories: () => {
    return axiosConfig.get(API_CONFIG.COURSE_CATEGORY.GET);
  },
  addCategory: (body: ICategory) => {
    return axiosConfig.post(API_CONFIG.COURSE_CATEGORY.POST, body);
  },
  editCategory: (props: ICategory) => {
    return axiosConfig.put(API_CONFIG.COURSE_CATEGORY.PUT(props.ID), {
      name: props.name,
    });
  },
  removeCategory: (ID: number) => {
    return axiosConfig.delete(API_CONFIG.COURSE_CATEGORY.DELETE(ID));
  },

  //ACCOUNTS
  getAccounts: () => {
    return axiosConfig.get(API_CONFIG.ACCOUNT.GET);
  },
  addAccount: (body: IAccountItem) => {
    return axiosConfig.post(API_CONFIG.ACCOUNT.POST, body);
  },
  editAccount: (props: IAccountItem) => {
    return axiosConfig.put(API_CONFIG.ACCOUNT.PUT(props.accountId), {
      ...props,
    });
  },
  deleteAccount: (accountId: number) => {
    return axiosConfig.delete(API_CONFIG.ACCOUNT.DEL(accountId));
  },
  infoAccount: (params: any) => {
    return configFormData.put(API_CONFIG.ACCOUNT.PUT_FORM, params);
  },
  //ROLES
  getRoles: () => {
    return axiosConfig.get(API_CONFIG.ROLES.GET);
  },

  //PROGRAMS

  getPublicPrograms: () => {
    return axiosConfig.get(API_CONFIG.PROGRAM.GETPUBLICPROGRAMS);
  },
  getPrograms: () => {
    return axiosConfig.get(API_CONFIG.PROGRAM.GET);
  },
  getProgram: (id: number) => {
    return axiosConfig.get(API_CONFIG.PROGRAM.GET_SINGLE(id));
  },
  getProgramContents: (ids: { programId: number; accountId: number }) => {
    return axiosConfig.get(API_CONFIG.PROGRAM.GET_CONTENT(ids));
  },
  addProgram: (body: IProgramItem) => {
    return configFormData.post(API_CONFIG.PROGRAM.POST, body);
  },
  delProgram: (id: number) => {
    return axiosConfig.delete(API_CONFIG.PROGRAM.DELETE(id));
  },
  putProgram: (id: number, params: any) => {
    return configFormData.put(API_CONFIG.PROGRAM.PUT(id), params);
  },
  sortProgram: (params: any) => {
    console.log(params);
    return axiosConfig.put(API_CONFIG.PROGRAM.SORT_CHAPTER, params);
  },
  //Faculties
  getFaculties: () => {
    return axiosConfig.get(API_CONFIG.FACULTIES.GET);
  },

  addFaculties: (params: any) => {
    return axiosConfig.post(API_CONFIG.FACULTIES.POST, params);
  },

  editFaculties: (id: number, params: any) => {
    return axiosConfig.put(API_CONFIG.FACULTIES.PUT(id), params);
  },

  delFaculties: (id: number) => {
    return axiosConfig.delete(API_CONFIG.FACULTIES.DELETE(id));
  },

  //QUESTION_TYPE
  getQuestionTypes: () => {
    return axiosConfig.get(API_CONFIG.QUESTION_TYPE.GET);
  },

  //TEST
  getTest: (id: number) => {
    return axiosConfig.get(API_CONFIG.TEST.GET + '?id=' + id);
  },
  addTest: (body: ITest) => {
    return axiosConfig.post(API_CONFIG.TEST.POST, body);
  },
  editTest: (props: { output: ITest; id: number }) => {
    return axiosConfig.put(API_CONFIG.TEST.PUT(props.id), {
      ...props.output,
    });
  },
  removeTest: (ID: number) => {
    return axiosConfig.delete(API_CONFIG.TEST.DELETE(ID));
  },
  doTest: (props: { accountId: number; body: any }) => {
    return axiosConfig.post(
      API_CONFIG.TEST.DO_TEST(props.accountId),
      props.body,
    );
  },
  checkTestPassed: (props: { accountId: number; testId: number }) => {
    return axiosConfig.get(
      API_CONFIG.TEST.CHECK_PASSED(props.accountId, props.testId),
    );
  },
  getScore: (props: { accountId: number; testId: number }) => {
    return axiosConfig.get(
      API_CONFIG.TEST.GET_SCORE({
        accountId: props.accountId,
        testId: props.testId,
      }),
    );
  },
  //QUESTIONS
  getQuestions: (id: number) => {
    return axiosConfig.get(API_CONFIG.QUESTION.GET + '?id=' + id);
  },
  addQuestion: (body: any) => {
    return axiosConfig.post(API_CONFIG.QUESTION.POST, body);
  },
  editQuestion: (props: { output: IQuestion; id: number }) => {
    return axiosConfig.put(API_CONFIG.QUESTION.PUT(props.id), {
      ...props.output,
    });
  },
  removeQuestion: (ID: number) => {
    return axiosConfig.delete(API_CONFIG.QUESTION.DELETE(ID));
  },
  removeAnswer: (ID: number) => {
    return axiosConfig.delete(API_CONFIG.QUESTION.DELETE_ANSWER(ID));
  },
  getAcademicYear: () => {
    return axiosConfig.get(API_CONFIG.ACADEMIC_YEAR.GET);
  },
  postAcademicYear: (params: any) => {
    return axiosConfig.post(API_CONFIG.ACADEMIC_YEAR.POST, params);
  },
  putAcademicYear: (id: number, params: any) => {
    return axiosConfig.put(API_CONFIG.ACADEMIC_YEAR.PUT(id), params);
  },
  delAcademicYear: (id: number) => {
    return axiosConfig.delete(API_CONFIG.ACADEMIC_YEAR.DEL(id));
  },
  getPositions: () => {
    return axiosConfig.get(API_CONFIG.POSITION.GET);
  },
  postPositions: (params: any) => {
    return axiosConfig.post(API_CONFIG.POSITION.POST, params);
  },
  putPositions: (id: number, params: any) => {
    return axiosConfig.put(API_CONFIG.POSITION.PUT(id), params);
  },
  delPositions: (id: number) => {
    return axiosConfig.delete(API_CONFIG.POSITION.DEL(id));
  },

  getContent: (id: number) => {
    return axiosConfig.get(API_CONFIG.CONTENT.GET(id));
  },
  postContent: (params: any) => {
    return axiosConfig.post(API_CONFIG.CONTENT.POST, params);
  },
  delContent: (id: number) => {
    return axiosConfig.delete(API_CONFIG.CONTENT.DELETE(id));
  },
  putContent: (id: number, params: any) => {
    return axiosConfig.put(API_CONFIG.CONTENT.PUT(id), params);
  },
  getReviewProgram: () => {
    return axiosConfig.get(API_CONFIG.PROGRAM.GET_REVIEW);
  },
  getContentProgram: (id: number) => {
    return axiosConfig.get(API_CONFIG.CONTENT_PROGRAM.GET(id));
  },
  getChapter: (id: number) => {
    return axiosConfig.get(API_CONFIG.CHAPTER.GET(id));
  },
  delChapter: (id: number) => {
    return axiosConfig.delete(API_CONFIG.CHAPTER.DEL(id));
  },
  putChapter: (id: number, params: IChapter) => {
    return axiosConfig.put(API_CONFIG.CHAPTER.PUT(id), params);
  },
  postChapter: (params: IChapter) => {
    return axiosConfig.post(API_CONFIG.CHAPTER.POST, params);
  },
  // REVIEWER
  getListProgramsByReviewer: (id: number) => {
    return axiosConfig.get(API_CONFIG.REVIEWER.GET_LIST_PROGRAM(id));
  },
  getReviewer: (id: number) => {
    return axiosConfig.get(API_CONFIG.REVIEWER.GET(id));
  },
  addReviewer: (params: any) => {
    return axiosConfig.post(API_CONFIG.REVIEWER.POST, params);
  },
  setApproval: (params: any) => {
    return axiosConfig.post(API_CONFIG.REVIEWER.APPROVE, params);
  },
  getReviewHistory: (id: number) => {
    return axiosConfig.get(API_CONFIG.REVIEWER.HISTORY(id));
  },
  likeProgram: (id: number, isLike: boolean) => {
    return axiosConfig.get(API_CONFIG.PROGRAM.LIKE(id, isLike));
  },
  setStatusProgram: (id: number, params: any) => {
    return configFormData.put(API_CONFIG.PROGRAM.SET_STATUS(id), params);
  },
  // GET PROGRAM INFO
  getQuestionCount: (id: number) => {
    return axiosConfig.get(API_CONFIG.CHECK_PROGRAM.GET_QUESTION_COUNT(id));
  },
  getChapterCount: (id: number) => {
    return axiosConfig.get(API_CONFIG.CHECK_PROGRAM.GET_CHAPTER_COUNT(id));
  },
  getProgramStatus: (id: number) => {
    return axiosConfig.get(API_CONFIG.CHECK_PROGRAM.GET_PROGRAM_STATUS(id));
  },
  getIfProgramIsRegistered: ({
    programId,
    accountId,
  }: {
    programId: number;
    accountId: number;
  }) => {
    return axiosConfig.get(
      API_CONFIG.CHECK_PROGRAM.GET_IF_PROGRAM_IS_REGISTERED(
        programId,
        accountId,
      ),
    );
  },

  // REGISTER AND LEARNER
  registerOrUn: (params: any) => {
    return axiosConfig.post(API_CONFIG.LEARNER.REGISTER_OR_UN, params);
  },

  getLearner_id: (id: number) => {
    return axiosConfig.get(API_CONFIG.LEARNER.GETLEANER_ID(id));
  },
  addLearner: (params: any) => {
    return axiosConfig.post(API_CONFIG.LEARNER.ADD_LEANER, params);
  },
  updateLearner: (id: number, params: any) => {
    return axiosConfig.put(API_CONFIG.LEARNER.UPDATE_LEANER(id), params);
  },
  delLearner: (id: number) => {
    return axiosConfig.delete(API_CONFIG.LEARNER.DELLEANER(id));
  },
  importFileLearner: (param: {
    body: {
      programId: number;
      emails: [];
    };
    accountId: number;
  }) => {
    return axiosConfig.post(
      API_CONFIG.LEARNER.IMPORT_FILE(param.accountId),
      param.body,
    );
  },
  getResultProgram: (accountId: number, programId: number) => {
    return axiosConfig.get(
      API_CONFIG.PROGRAM.PROGRAM_RESULT(accountId, programId),
    );
  },
  getProgramComplete: (accountId: number) => {
    return axiosConfig.get(API_CONFIG.PROGRAM.GET_PROGRAM_COMPLETE(accountId));
  },
  getCertificate: (accountId: number, programId: number) => {
    return axiosConfig.get(
      API_CONFIG.PROGRAM.GET_CERTIFICATE(accountId, programId),
    );
  },
  getMyPrograms: (accountId: number) => {
    return axiosConfig.get(API_CONFIG.PROGRAM.MY_PROGRAMS(accountId));
  },
  getMyApplications: () => {
    return axiosConfig.get(API_CONFIG.PROGRAM.MY_APPLICATIONS);
  },
  getProgramPublish: () => {
    return axiosConfig.get(API_CONFIG.PROGRAM.GETPROGRAMPUBLISH);
  },
  getApplication_program: (id: number) => {
    return axiosConfig.get(API_CONFIG.LEARNER.APPLICATION_PROGRAM(id));
  },
  refulseApplication: (id: number, params: any) => {
    return axiosConfig.put(API_CONFIG.LEARNER.REFUSE(id), params);
  },
  approveApplication: (id: number) => {
    return axiosConfig.put(API_CONFIG.LEARNER.APPROVE(id));
  },

  //COMMENT

  getComment: (idProgram: number) => {
    return axiosConfig.get(API_CONFIG.COMMENT.GET_COMMENT(idProgram));
  },
  sentComment: (params: any) => {
    return axiosConfig.post(API_CONFIG.COMMENT.SENT_COMMENT, params);
  },
  deleteComment: (idComment: number) => {
    return axiosConfig.delete(API_CONFIG.COMMENT.DELETE_COMMENT(idComment));
  },
  getCommentedPrograms: () => {
    return axiosConfig.get(API_CONFIG.COMMENT.GET_COMMENTED_PROGRAM);
  },

  // Attendance
  getAttendance: (id: number) => {
    return axiosConfig.get(API_CONFIG.ATTENDANCES.GET_ATTENDANCES(id));
  },
  getAttendanceId: (id: number) => {
    return axiosConfig.get(API_CONFIG.ATTENDANCES.GET_ID_ATTENDANCES(id));
  },
  postAttendance: (params: any) => {
    return axiosConfig.post(API_CONFIG.ATTENDANCES.POST_ATTENDANCES, params);
  },
  putAttendance: (params: any, id: number) => {
    return axiosConfig.put(API_CONFIG.ATTENDANCES.PUT_ATTENDANCES(id), params);
  },
  delAttendance: (id: number) => {
    return axiosConfig.delete(API_CONFIG.ATTENDANCES.DEL_ATTENDANCES(id));
  },
  AttdendanceEmail: (params: any) => {
    return axiosConfig.post(API_CONFIG.ATTENDANCES.ATTENDANCES_EMAIL, params);
  },
  AttdendanceCode: (params: any) => {
    return axiosConfig.post(API_CONFIG.ATTENDANCES.ATTENDANCES_CODE, params);
  },
  getNotAttendance: (id: number) => {
    return axiosConfig.get(API_CONFIG.ATTENDANCES.NOT_ATTENDANCE(id));
  },
  // SURVEY

  getSurveys: () => {
    return axiosConfig.get(API_CONFIG.SURVEY.GETALL);
  },
  getSurveyQuestions: (idSurvey: number) => {
    return axiosConfig.get(API_CONFIG.SURVEY.GET_QUESTIONS(idSurvey));
  },
  getPublicSurveys: () => {
    return axiosConfig.get(API_CONFIG.SURVEY.GET_PUBLIC);
  },
  getSurvey: (idSurvey: number) => {
    return axiosConfig.get(API_CONFIG.SURVEY.GET_SURVEY(idSurvey));
  },
  getMySurveys: (idAccount: number) => {
    return axiosConfig.get(API_CONFIG.SURVEY.GET_MY_SURVEYS(idAccount));
  },
  getAccountSurveys: (idSurvey: number) => {
    return axiosConfig.get(API_CONFIG.SURVEY.GET_LIST_ACCOUNT_SURVEY(idSurvey));
  },
  getAccountSurveyAnswers: (idSurvey: number, idAccount: number) => {
    return axiosConfig.get(
      API_CONFIG.SURVEY.GET_LIST_SURVEY_ANSWERS(idSurvey, idAccount),
    );
  },
  checkDoneSurvey: (idProgram: number, idAccount: number) => {
    return axiosConfig.get(
      API_CONFIG.SURVEY.CHECK_DONE_SURVEY(idProgram, idAccount),
    );
  },

  addSurvey: (params: ISurveyItem) => {
    return axiosConfig.post(API_CONFIG.SURVEY.CREATE_SURVEY, params);
  },
  doSurvey: (params: ISurveyAnswer) => {
    return axiosConfig.post(API_CONFIG.SURVEY.DO_SURVEY, params);
  },
  doProgramSurvey: (params: ISurveyProgram) => {
    return axiosConfig.post(API_CONFIG.SURVEY.DO_PROGRAM_SURVEY, params);
  },
  addSurveyQuestion: (params: ISurveyQuestion) => {
    return axiosConfig.post(API_CONFIG.SURVEY.CREATE_QUESTION, params);
  },
  updateSurvey: (id: number, params: any) => {
    return axiosConfig.put(API_CONFIG.SURVEY.UPDATE_SURVEY(id), params);
  },
  publishSurvey: (id: number) => {
    return axiosConfig.put(API_CONFIG.SURVEY.PUBLISH_SURVEY(id));
  },
  getProgramStatistic: (programId: number) => {
    return axiosConfig.get(API_CONFIG.SURVEY.GET_PROGRAM_STATISTIC(programId));
  },
  getSurveyPrograms: () => {
    return axiosConfig.get(API_CONFIG.SURVEY.GET_LIST_PROGRAM);
  },

  updateSurveyQuestion: (id: number, params: any) => {
    console.log(params);
    return axiosConfig.put(API_CONFIG.SURVEY.UPDATE_QUESTION(id), params);
  },
  deleteSurveyQuestions: (idQuestion: number) => {
    return axiosConfig.delete(API_CONFIG.SURVEY.DELETE_QUESTION(idQuestion));
  },
  deleteSurveyContent: (idContent: number) => {
    return axiosConfig.delete(API_CONFIG.SURVEY.DELETE_CONTENT(idContent));
  },
  deleteSurvey: (idSurvey: number) => {
    return axiosConfig.delete(API_CONFIG.SURVEY.DELETE_SURVEY(idSurvey));
  },

  //STATISTIC
  getProgramResult: (programId: number) => {
    return axiosConfig.get(API_CONFIG.STATISTIC.GET_PROGRAM_RESULT(programId));
  },
  getFacultyStatistic: (academicYearId: number) => {
    return axiosConfig.get(
      API_CONFIG.STATISTIC.GET_FACULTY_STATISTIC(academicYearId),
    );
  },
  getCategoryStatistic: (academicYearId: number) => {
    return axiosConfig.get(
      API_CONFIG.STATISTIC.GET_CATEGORY_STATISTIC(academicYearId),
    );
  },

  getDashboard: () => {
    return axiosConfig.get(API_CONFIG.STATISTIC.GET_DASHBOARD);
  },

  getDashboardByYear: (yearId: number) => {
    return axiosConfig.get(API_CONFIG.STATISTIC.GET_DASHBOARD_BY_YEAR(yearId));
  },

  getMyStatics: (accountId: number) => {
    return axiosConfig.get(API_CONFIG.STATISTIC.GET_MY_STATISTIC(accountId));
  },

  //gift
  getAllGift: () => {
    return axiosConfig.get(API_CONFIG.GIFT.GET_ALL_GIFTS);
  },
  addGift: (params: any) => {
    return configFormData.post(API_CONFIG.GIFT.POST_GIFT, params);
  },
  getGiftId: (idGift: number) => {
    return axiosConfig.get(API_CONFIG.GIFT.GET_GIFT(idGift));
  },
  deleteGift: (idGift: number) => {
    return axiosConfig.delete(API_CONFIG.GIFT.DELETE_GIFT(idGift));
  },
  updateGift: (idGift: number, params: any) => {
    return configFormData.put(API_CONFIG.GIFT.UPDATE_GIFT(idGift), params);
  },
  getGiftExchange: () => {
    return axiosConfig.get(API_CONFIG.GIFT.GET_EXCHANGE);
  },
  getGiftMyExchange: () => {
    return axiosConfig.get(API_CONFIG.GIFT.GET_MY_EXCHANGE);
  },
  changeGiftStatus: (params: IGIFTSTATUS) => {
    return axiosConfig.put(API_CONFIG.GIFT.CHANGE_STATUS, params);
  },
  ExchangeGift: (params: IADDEXCHANGE) => {
    return axiosConfig.post(API_CONFIG.GIFT.POST_EXCHANGE, params);
  },
  //EXCHANGE COIN
  getExchanges: () => {
    return axiosConfig.get(API_CONFIG.EXCHANGE.GET);
  },
  getLearnerExchanges: (idAccount: number) => {
    return axiosConfig.get(API_CONFIG.EXCHANGE.GET_LEARNER(idAccount));
  },

  getDetailExchange: (idExchange: number, idAccount: number) => {
    return axiosConfig.get(
      API_CONFIG.EXCHANGE.GET_DETAIL(idExchange, idAccount),
    );
  },
  postExchange: (params: IExchangeCoin) => {
    return axiosConfig.post(API_CONFIG.EXCHANGE.POST, params);
  },
  putExchange: (idExchange: number, params: IExchangeCoin) => {
    return axiosConfig.put(API_CONFIG.EXCHANGE.PUT(idExchange), params);
  },
  deleteExchange: (idExchange: number) => {
    return axiosConfig.delete(API_CONFIG.EXCHANGE.DELETE(idExchange));
  },
  postCertificationImage: (params: any) => {
    return configFormData.post(API_CONFIG.EXCHANGE.ADD_IMG, params);
  },

  updateCertificationImage: (id: number, params: any) => {
    return configFormData.put(API_CONFIG.EXCHANGE.UPDATE_IMG(id), params);
  },

  getCertifications: (idExchange: number) => {
    return axiosConfig.get(API_CONFIG.EXCHANGE.GET_CERTIFICATIONS(idExchange));
  },
  denyExchange: (params: {
    id: number;
    reviewerId: number;
    comment: string;
  }) => {
    return axiosConfig.put(API_CONFIG.EXCHANGE.DENY, params);
  },
  approveExchange: (params: { id: number; reviewerId: number }) => {
    return axiosConfig.put(API_CONFIG.EXCHANGE.APPROVE, params);
  },

  //HOME
  getPopularPrograms: () => {
    return axiosConfig.get(API_CONFIG.HOME.GET_POPULAR);
  },
  getNewPrograms: () => {
    return axiosConfig.get(API_CONFIG.HOME.GET_NEW);
  },
  giveCoin: (params: any) => {
    return axiosConfig.post(API_CONFIG.GIFT.GIVE_COIN, params);
  },

  //NOTIFICATION
  getNotifications: () => {
    return axiosConfig.get(API_CONFIG.ACCOUNT.GET_NOTIFICATIONS);
  },

  seenNotification: (id: number) => {
    return axiosConfig.get(API_CONFIG.ACCOUNT.SEEN_NOTIFICATION(id));
  },
};
