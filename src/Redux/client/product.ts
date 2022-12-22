import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'product',
  initialState: {
    detail: null,
    updateLike: false,
  },

  reducers: {
    setUpdateLike(state) {
      state.updateLike = !state.updateLike;
    },
    setDetail(state, action) {
      state.detail = action.payload;
    },
  },
});
export const productReducers = slice.reducer;
export const productActions = slice.actions;
