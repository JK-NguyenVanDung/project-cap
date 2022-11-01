import { createSlice } from '@reduxjs/toolkit'
import { reducers } from '.'
import { CategoryItem } from '../../Type'

const slice = createSlice({
  name: 'category',
  initialState: {
    detail: null,
    listAll: [],
    listCate: [],
    loadData: false,
  },
  reducers: {
    setListCate(state, actions) {
      state.listCate = actions.payload
    },
    setDetail(state, actions) {
      let data = [...state.listAll]
      let index = data.findIndex(
        (item: CategoryItem) => item.categoryID === actions.payload
      )
      state.detail = data[index]
    },

    setListAll(state, actions) {
      state.listAll = actions.payload
    },
    changeLoad(state, actions) {
      state.loadData = actions.payload
    },
  },
})
export const categoryReducer = slice.reducer
export const categoryActions = slice.actions
