import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'auth',
  initialState: {
    tokenMicrosoft: null,
    token: null,
    info: null,
  },
 
  reducers: {
    Login(state, actions) {
      state.token = actions.payload
    },
    setTokenMicrosoft(state, actions){
      state.tokenMicrosoft = actions.payload
    },
    logout(state) {
      state.token = null
    },
    setInfo(state, actions) {
      state.info = actions.payload
    },
  },
})
export const authReducers = slice.reducer
export const authActions = slice.actions
