import { formActions, formReducer } from './form';
import { authActions, authReducers } from './auth';
import { categoryActions, categoryReducer } from './admin/category';
import { questionActions, questionReducer } from './admin/question';
import { reloadActions, reloadReducer } from './admin/reloadTable';

import { productActions, productReducers } from './client/product';

import { testActions, testReducers } from './client/test';
import { navActions, navReducers } from './nav';

const actions = {
  formActions,
  questionActions,
  authActions,
  productActions,
  navActions,
  testActions,
  reloadActions,
};

const reducers = {
  formReducer,
  questionReducer,
  authReducers,
  productReducers,
  testReducers,
  navReducers,
  reloadReducer,
};

export { actions, reducers };
