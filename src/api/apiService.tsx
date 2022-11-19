import { API_CONFIG } from './api';
import axiosConfig from './axiosConfig';
import { ICategory, IFuculties } from './apiInterface';
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

  //Fucuties
  getFuculties: () => {
    return axiosConfig.get(API_CONFIG.FUCULTIES.GET);
  },

  addFuculties: (params: any) => {
    return axiosConfig.post(API_CONFIG.FUCULTIES.POST, params);
  },

  editFuculties: (id: number) => {
    return axiosConfig.put(API_CONFIG.FUCULTIES.PUT(id));
  },

  delFuculties: (id: number) => {
    return axiosConfig.delete(API_CONFIG.FUCULTIES.DEL(id));
  },
};
