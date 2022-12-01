import { formActions, formReducer } from './form';
import { authActions, authReducers } from './auth';
import { categoryActions, categoryReducer } from './admin/category';
import { questionActions, questionReducer } from './admin/question';

const actions = {
  formActions,
  questionActions,
  authActions,
};

const reducers = {
  formReducer,
  questionReducer,
  authReducers,
};

export { actions, reducers };
