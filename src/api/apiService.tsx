import { API_CONFIG } from './api';
import axiosConfig from './axiosConfig';
import { ICategory, IFaculties } from './apiInterface';
import { IAccountItem, IProgramItem } from '../Type';
export default {
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
    return axiosConfig.post(API_CONFIG.PROGRAM.POST, body);
  },

  //Faculties
  getFaculties: () => {
    return axiosConfig.get(API_CONFIG.Faculties.GET);
  },

  addFaculties: (params: any) => {
    return axiosConfig.post(API_CONFIG.Faculties.POST, params);
  },

  editFaculties: (id: number, params: any) => {
    return axiosConfig.put(API_CONFIG.Faculties.PUT(id), params);
  },

  delFaculties: (id: number) => {
    return axiosConfig.delete(API_CONFIG.Faculties.DEL(id));
  },

  //QUESTION_TYPE
  getQuestionTypes: () => {
    return axiosConfig.get(API_CONFIG.QUESTION_TYPE.GET);
  },

  //TEST
  getTests: () => {
    return axiosConfig.get(API_CONFIG.TEST.GET);
  },
  addTest: (body: any) => {
    return axiosConfig.post(API_CONFIG.TEST.POST, body);
  },
  editTest: (props: any) => {
    return axiosConfig.put(API_CONFIG.TEST.PUT(props.ID), {
      name: props.name,
    });
  },
  removeTest: (ID: number) => {
    return axiosConfig.delete(API_CONFIG.TEST.DELETE(ID));
  },
  //QUESTIONS
  getQuestions: () => {
    return axiosConfig.get(API_CONFIG.QUESTION.GET);
  },
  addQuestion: (body: any) => {
    return axiosConfig.post(API_CONFIG.QUESTION.POST, body);
  },
  editQuestion: (props: any) => {
    return axiosConfig.put(API_CONFIG.QUESTION.PUT(props.ID), {
      name: props.name,
    });
  },
  removeQuestion: (ID: number) => {
    return axiosConfig.delete(API_CONFIG.QUESTION.DELETE(ID));
  },
};
