import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'test',
  initialState: {
    selectedTest: null,
    answers: [],
    listQuestions: [],
    currentQuestions: [],
    range: { base: 0, limit: 5 },
    time: { minutes: 0, seconds: 0 },
    answerLength: 0,
  },

  reducers: {
    setTime(state, action) {
      state.time = action.payload;
    },
    addAnswers(state, action) {
      let out = action.payload;
      if (!out.isMultiple) {
        let tempArr = state.answers
          .slice()
          .filter((item) => item.questionId !== out.questionId);
        return {
          ...state,
          answerLength: tempArr.length + 1,

          answers: [...tempArr, out],
        };
      } else if (
        state.answers.find(
          (item) => item.questionContentId === out.questionContentId,
        )
      ) {
        let tempArr = state.answers
          .slice()
          .filter((item) => item.questionContentId !== out.questionContentId);
        return {
          ...state,
          answerLength: tempArr.length - 1,
          answers: tempArr,
        };
      }
      return {
        ...state,
        answerLength: state.answers.length + 1,
        answers: [...state.answers, out],
      };
    },
    setRange(state, action) {
      state.range = action.payload;
    },
    setListCurrentQuestions(state, action) {
      state.currentQuestions = action.payload;
    },
    setListQuestions(state, action) {
      state.listQuestions = action.payload;
    },
    setSelectedTest(state, action) {
      state.selectedTest = action.payload;
    },
  },
});
export const testReducers = slice.reducer;
export const testActions = slice.actions;
