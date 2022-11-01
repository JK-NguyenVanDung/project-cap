import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducers } from './Redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
const config = combineReducers({
  form: reducers.formReducer,
})
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  version: 1,
  // blacklist:[]
}
const persisReducerConfig = persistReducer(persistConfig, config)
const store = configureStore({
  reducer: persisReducerConfig,
})
export const persistor = persistStore(store)
export default store
