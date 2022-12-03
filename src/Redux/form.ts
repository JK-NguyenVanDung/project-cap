import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'form',
  initialState: {
    nameMenu: null,
    show: false,
    loadData: false,
    setProgram: null,
    setChapter: null,
    reload: false,
    programId: null,
  },
  reducers: {
    setProgramId(state, actions) {
      state.programId = actions.payload;
    },
    setReload(state, actions) {
      state.reload = actions.payload;
    },
    setNameMenu(state, actions) {
      state.nameMenu = actions.payload;
    },
    changeLoad(state, actions) {
      state.loadData = actions.payload;
    },
    showForm(state) {
      state.show = true;
    },
    closeForm(state) {
      state.show = false;
    },
    setForm(state, actions) {
      state.show = actions.payload;
    },
    setProgramForm(state, actions) {
      state.setProgram = actions.payload;
    },
    setChappter(state, actions) {
      state.setChapter = actions.payload;
    },
  },
});
export const formReducer = slice.reducer;
export const formActions = slice.actions;
