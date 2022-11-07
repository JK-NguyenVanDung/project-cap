import { API_CONFIG } from './api'
import axiosConfig from './axiosConfig'
import { ICategory } from './apiInterface'
export default {
  //CATEGORY
  getCategories: () => {
    return axiosConfig.get(API_CONFIG.COURSE_CATEGORY.GET)
  },
  addCategory: (body: ICategory) => {
    return axiosConfig.post(API_CONFIG.COURSE_CATEGORY.POST, body)
  },
  editCategory: (props: ICategory) => {
    return axiosConfig.post(
      API_CONFIG.COURSE_CATEGORY.PUT(props.ID),
      props.Name
    )
  },
  removeCategory: (ID: number) => {
    return axiosConfig.delete(API_CONFIG.COURSE_CATEGORY.DELETE(ID))
  },
}
