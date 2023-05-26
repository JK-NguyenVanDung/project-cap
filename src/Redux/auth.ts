import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'auth',
  initialState: {
    tokenMicrosoft: null,
    token: null,
    info: null, //roleID: 2 admin | 3:center | 4:faculty
    LoginId: null,
    notification: false,
    firstTimeLogin: false,
  },

  reducers: {
    showNotification(state, actions) {
      state.notification = actions.payload;
    },
    Login(state, actions) {
      state.token = actions.payload?.token;
      state.firstTimeLogin = actions.payload?.isFirst;
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
