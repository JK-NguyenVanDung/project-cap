import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'reload',
  initialState: {
    reload: false,
  },
  reducers: {
    setReload(state) {
      state.reload = !state.reload;
    },
  },
});
export const reloadReducer = slice.reducer;
export const reloadActions = slice.actions;
