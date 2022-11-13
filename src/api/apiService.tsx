import { API_CONFIG } from './api'
import axiosConfig from './axiosConfig'
import { ICategory } from './apiInterface'
import { IAccountItem } from '../Type'
export default {
  //CATEGORY
  getCategories: () => {
    return axiosConfig.get(API_CONFIG.COURSE_CATEGORY.GET)
  },
  addCategory: (body: ICategory) => {
    return axiosConfig.post(API_CONFIG.COURSE_CATEGORY.POST, body)
  },
  editCategory: (props: ICategory) => {
    return axiosConfig.put(API_CONFIG.COURSE_CATEGORY.PUT(props.ID), {
      name: props.name,
    })
  },
  removeCategory: (ID: number) => {
    return axiosConfig.delete(API_CONFIG.COURSE_CATEGORY.DELETE(ID))
  },

  //ACCOUNTS
  getAccounts: () => {
    return axiosConfig.get(API_CONFIG.ACCOUNT.GET)
  },
  addAccount: (body: IAccountItem) => {
    return axiosConfig.post(API_CONFIG.ACCOUNT.POST, body)
  },
  editAccount: (props: IAccountItem) => {
    return axiosConfig.put(API_CONFIG.ACCOUNT.PUT(props.accountId), {
      ...props,
    })
  },

  //ROLES
  getRoles: () => {
    return axiosConfig.get(API_CONFIG.ROLES.GET)
  },
}
