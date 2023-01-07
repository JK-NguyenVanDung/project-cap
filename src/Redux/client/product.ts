import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'product',
  initialState: {
    detail: null,
    updateLike: false,
    programId: null,
    contentBreadcrumb: '',
    selectedChapter: null,
    initChapter: null,
    viewedContent: false,
  },

  reducers: {
    setUpdateLike(state, action) {
      state.updateLike = action.payload;
    },
    setUnlock(state, action) {
      state.viewedContent = action.payload;
    },
    setDetail(state, action) {
      state.detail = action.payload;
    },
    setProgramId(state, action) {
      state.programId = action.payload;
    },
    setContentBreadcrumb(state, action) {
      state.contentBreadcrumb = action.payload;
    },
    setSelectedChapter(state, action) {
      state.selectedChapter = action.payload;
    },
    setInitSelectedChapter(state, action) {
      state.initChapter = action.payload;
    },
  },
});
export const productReducers = slice.reducer;
export const productActions = slice.actions;
