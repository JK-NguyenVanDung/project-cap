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
    isTest: false,
  },

  reducers: {
    reset(state) {
      return {
        ...state,
        answerLength: 0,
        answers: [],
        currentQuestions: [],
        range: { base: 0, limit: 5 },
        time: { minutes: 0, seconds: 0 },
      };
    },

    setIsTest(state, action) {
      state.isTest = action.payload;
    },
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
          answerLength: state.answerLength + 1,

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
          answerLength: !state.answers.find(
            (item) => item.questionId === out.questionId,
          )
            ? tempArr.length - 1
            : state.answerLength,
          answers: tempArr,
        };
      }
      return {
        ...state,
        answerLength: !state.answers.find(
          (item) => item.questionId === out.questionId,
        )
          ? state.answers.length + 1
          : state.answerLength,
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
