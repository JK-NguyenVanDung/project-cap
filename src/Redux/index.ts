import { formActions, formReducer } from './form'
import { categoryActions, categoryReducer } from './admin/category'
const actions = {
  formActions,
  categoryActions,
}

const reducers = {
  formReducer,
  categoryReducer,
}

export { actions, reducers }
