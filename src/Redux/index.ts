import { formActions, formReducer } from './form'
import { authActions, authReducers } from './auth'
import { categoryActions, categoryReducer } from './admin/category'
const actions = {
  formActions,
  categoryActions,
  authActions,
}

const reducers = {
  formReducer,
  categoryReducer,
  authReducers,
}

export { actions, reducers }
