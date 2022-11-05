import { API_CONFIG } from './api'
import axiosConfig from './axiosConfig'

export default {
  getCategory: () => {
    return axiosConfig.get(API_CONFIG.COURSE_CATEGORY.GET)
  },
}
