import { formActions, formReducer } from './form';
import { authActions, authReducers } from './auth';
import { categoryActions, categoryReducer } from './admin/category';
import { questionActions, questionReducer } from './admin/question';
import { productActions, productReducers } from './client/product';
import { navActions, navReducers } from './nav';

const actions = {
  formActions,
  questionActions,
  authActions,
  productActions,
  navActions,
};

const reducers = {
  formReducer,
  questionReducer,
  authReducers,
  productReducers,
  navReducers,
};

export { actions, reducers };
