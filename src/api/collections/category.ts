import api from '../axiosConfig'
import { API_CONSTANTS } from '../api'
import { CategoryItem } from '../../Type'
import { ICategory } from '../apiInterface'

export const getCategories = async () => {
  try {
    const response = await api.get(API_CONSTANTS.COURSE_CATEGORY.GET)
    return response
  } catch (err: any) {
    throw err.message
  }
}
// export const getCategory = async (id: number) => {
//   try {
//     const response = await api.get(API_CONSTANTS.COURSE_CATEGORY.GET)
//     return response
//   } catch (err: any) {
//     throw err.message
//   }
// }
export const addCategory = async (body: ICategory) => {
  try {
    const response = await api.post(API_CONSTANTS.COURSE_CATEGORY.POST, body)

    return response
  } catch (err: any) {
    throw err.message
  }
}
export const editCategory = async (props: any) => {
  try {
    const response = await api.put(
      API_CONSTANTS.COURSE_CATEGORY.PUT(props.id),
      props.body
    )
    return response
  } catch (err: any) {
    throw err.message
  }
}
export const removeCategory = async (id: number) => {
  try {
    const response = await api.delete(API_CONSTANTS.COURSE_CATEGORY.DELETE(id))
    return response
  } catch (err: any) {
    throw err.message
  }
}
