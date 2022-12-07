import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'auth',
  initialState: {
    tokenMicrosoft: null,
    token: null,
    info: null,
    LoginId: null,
  },

  reducers: {
    Login(state, actions) {
      state.token = actions.payload;
    },
    setTokenMicrosoft(state, actions) {
      state.tokenMicrosoft = actions.payload;
    },
    logout(state) {
      state.token = null;
    },
    setInfo(state, actions) {
      state.info = actions.payload;
    },
    setRoleLogin(state, action) {
      state.LoginId = action.payload;
    },
  },
});
export const authReducers = slice.reducer;
export const authActions = slice.actions;
