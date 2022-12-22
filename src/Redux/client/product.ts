import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'product',
  initialState: {
    detail: null,
  },

  reducers: {
    setDetail(state, action) {
      state.detail = action.payload;
    },
  },
});
export const productReducers = slice.reducer;
export const productActions = slice.actions;
