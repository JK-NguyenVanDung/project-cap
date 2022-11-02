import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'form',
  initialState: {
    nameMenu: null,
    show: false,
    loadData: false,
  },
  reducers: {
    setNameMenu(state, actions) {
      state.nameMenu = actions.payload
    },
    changeLoad(state, actions) {
      state.loadData = actions.payload
    },
    showForm(state) {
      state.show = true
    },
    closeForm(state) {
      state.show = false
    },
    setForm(state, actions) {
      state.show = actions.payload
    },
  },
})
export const formReducer = slice.reducer
export const formActions = slice.actions
