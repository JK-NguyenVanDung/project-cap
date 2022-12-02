import { API_CONFIG } from './api';
import axiosConfig, { configFormData } from './axiosConfig';
import { ICategory, IFaculties } from './apiInterface';
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
    return axiosConfig.get(API_CONFIG.AUTH.GETPROFILE);
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
  getAcedemicYear: () => {
    return axiosConfig.get(API_CONFIG.ACEDEMICYEAR.GET);
  },
  getPositions: () => {
    return axiosConfig.get(API_CONFIG.POSITION.GET);
  },
  getContentProgram: (id: number) => {
    return axiosConfig.get(API_CONFIG.CONTENTPROGRAM.GET(id));
  },
};
