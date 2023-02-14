import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'survey',
  initialState: {
    selectedSurvey: null,
    answers: [],
    listQuestions: [],
    currentQuestions: [],
    selectedType: true,
    range: { base: 0, limit: 5 },
    isReviewing: false,
    currentQuestionIndex: 0,

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
    currentQuestion: {},
    detail: null,
  },

  reducers: {
    setCurrentQuestionIndex(state, actions) {
      state.currentQuestionIndex = actions.payload;
    },
    setCurrentQuestion(state, actions) {
      state.currentQuestion = actions.payload;
      state.detail = actions.payload;
    },
    setRadioOptions(state, actions) {
      state.radioOptions = actions.payload;
    },
    setIsReviewing(state, action) {
      state.isReviewing = action.payload;
    },
    reset(state) {
      return {
        ...state,
        isReviewing: false,
        answerLength: 0,
        answers: [],
        currentQuestions: [],
        range: { base: 0, limit: 5 },
        time: { minutes: 0, seconds: 0 },
      };
    },
    setRange(state, action) {
      state.range = action.payload;
    },
    setSelectedType(state, actions) {
      console.log(actions.payload);
      state.selectedType = actions.payload;
    },
    addAnswers(state, action) {
      let out = action.payload;
      console.log(out);

      console.log(state.answers);

      if (!out.isChoice) {
        let isEmpty = out.content.trim() == '';
        let tempArr = isEmpty
          ? state.answers
              .slice()
              .filter((item) => item.questionSurveyId !== out.questionSurveyId)
          : state.answers;
        return {
          ...state,

          answers: isEmpty ? tempArr : [...tempArr, out],
        };
      } else {
        let tempArr = state.answers
          .slice()
          .filter((item) => item.questionSurveyId !== out.questionSurveyId);
        return {
          ...state,

          answers: [...tempArr, out],
        };
      }
    },

    setListCurrentQuestions(state, action) {
      state.currentQuestions = action.payload;
    },
    setListQuestions(state, action) {
      state.listQuestions = action.payload;
    },
    setSelectedSurvey(state, action) {
      state.selectedSurvey = action.payload;
    },
  },
});
export const surveyReducers = slice.reducer;
export const surveyActions = slice.actions;
