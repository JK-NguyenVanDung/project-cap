import { API_CONFIG } from './api';
import axiosConfig, { configFormData } from './axiosConfig';
import { ICategory, IFaculties } from './apiInterface';
import { IAccountItem, IProgramItem } from '../Type';
export default {
  //auth
  postAdminUser: (token: any) => {
    console.log('ádjhfkasjdh', token);

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
    return axiosConfig.delete(API_CONFIG.PROGRAM.DEL(id));
  },
  putProgram: (id: number) => {
    return axiosConfig.delete(API_CONFIG.PROGRAM.PUT(id));
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
    return axiosConfig.delete(API_CONFIG.FACULTIES.DEL(id));
  },

  //program
};
