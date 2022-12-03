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
    currentQuestionIndex: 0,
    currentQuestion: {},
    radioValue: 1,
    selectedOptions: [1],
    selectedType: 1,
    questionTypeList: [],
    radioOptions: [
      {
        value: 1,
      },
      { value: 2 },
      {
        value: 3,
      },
      {
        value: 4,
      },
    ],
  },
  reducers: {
    setRadioOptions(state, actions) {
      state.radioOptions = actions.payload;
    },
    setSelectedOptions(state, actions) {
      state.selectedOptions = actions.payload;
    },
    setCurrentQuestionIndex(state, actions) {
      state.currentQuestionIndex = actions.payload;
    },
    setCurrentQuestion(state, actions) {
      state.currentQuestion = actions.payload;
      state.detail = actions.payload;
    },
    setRadioValue(state, actions) {
      state.radioValue = actions.payload;
    },
    setSelectedType(state, actions) {
      state.selectedType = actions.payload;
    },
    setQuestionTypeList(state, actions) {
      state.questionTypeList = actions.payload;
    },
    setListAnswer(state, actions) {
      state.listAnswer = actions.payload;
    },
    setDetail(state, actions) {
      state.detail = actions.payload;
    },
    setListAll(state, actions) {
      state.listAll = actions.payload;
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
