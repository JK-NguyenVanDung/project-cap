import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'nav',
  initialState: {
    nav: null,
  },
  reducers: {
    setNav(state, action) {
      state.nav = action.payload;
    },
  },
});
export const navReducers = slice.reducer;
export const navActions = slice.actions;
