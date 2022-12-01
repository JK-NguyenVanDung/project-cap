import { createSlice } from '@reduxjs/toolkit';
import { ICategoryItem } from '../../Type';

const slice = createSlice({
  name: 'question',
  initialState: {
    detail: null,
    listAll: [],
    listCate: [],
    loadData: false,
    testId: null,
    hasQuestion: false,
  },
  reducers: {
    setListCate(state, actions) {
      state.listCate = actions.payload;
    },
    setDetail(state, actions) {
      let data = [...state.listAll];
      let index = data.findIndex(
        (item: any) => item.categoryId === actions.payload,
      );
      state.detail = data[index];
    },

    setListAll(state, actions) {
      state.listAll = actions.payload.reverse();
    },
    changeLoad(state, actions) {
      state.loadData = actions.payload;
    },
    setTestId(state, actions) {
      state.testId = actions.payload;
    },
    setHasQuestion(state, actions) {
      state.hasQuestion = actions.payload;
    },
  },
});
export const questionReducer = slice.reducer;
export const questionActions = slice.actions;
