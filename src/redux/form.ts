import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'form',
  initialState: {
    nameMenu: null,
  },
  reducers: {
    setNameMenu(state, actions) {
      state.nameMenu = actions.payload
    },
  },
})
export const formReducer = slice.reducer
export const formActions = slice.actions
