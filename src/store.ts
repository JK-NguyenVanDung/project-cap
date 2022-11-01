import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducers } from './redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const config = combineReducers({
  form: reducers.formReducer,
  category: reducers.categoryReducer,
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
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
