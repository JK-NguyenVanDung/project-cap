import { createSlice } from '@reduxjs/toolkit';
import { ICategoryItem } from '../../Type';

const slice = createSlice({
  name: 'question',
  initialState: {
    detail: null,
    listAll: [],
    listAnswer: [],
    loadData: false,
    testId: null,
    hasQuestion: false,
  },
  reducers: {
    setListAnswer(state, actions) {
      state.listAnswer = actions.payload;
    },
    setDetail(state, actions) {
      state.detail = actions.payload;
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
