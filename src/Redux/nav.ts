import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'nav',
  initialState: {
    nav: null,
    isLike: false,
  },
  reducers: {
    setNav(state, action) {
      state.nav = action.payload;
    },
    setIsLike(state, action) {
      state.isLike = action.payload;
    },
  },
});
export const navReducers = slice.reducer;
export const navActions = slice.actions;
