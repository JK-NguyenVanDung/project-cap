import { API_CONFIG } from './api';
import axiosConfig, { configFormData } from './axiosConfig';
import { ICategory, IChapter } from './apiInterface';
import {
  IAccountItem,
  IProgramItem /* IQuestion, ITest  */,
  IQuestion,
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

  //ROLES
  getRoles: () => {
    return axiosConfig.get(API_CONFIG.ROLES.GET);
  },

  //PROGRAMS
  getPrograms: () => {
    return axiosConfig.get(API_CONFIG.PROGRAM.GET);
  },
  getProgram: (id: number) => {
    return axiosConfig.get(API_CONFIG.PROGRAM.GET_SINGLE(id));
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
  getAcedemicYear: () => {
    return axiosConfig.get(API_CONFIG.ACADEMIC_YEAR.GET);
  },
  postAcedemicYear: (params: any) => {
    return axiosConfig.post(API_CONFIG.ACADEMIC_YEAR.POST, params);
  },
  putAcedemicYear: (id: number, params: any) => {
    return axiosConfig.put(API_CONFIG.ACADEMIC_YEAR.PUT(id), params);
  },
  delAcedemicYear: (id: number) => {
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
};
