import { History } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import createReducer from './rootReducer'
export { default as withReducer } from './withReducer'
import { initAsyncReducers } from './asyncReduces'

const logger = createLogger({})

export type RootState = ReturnType<ReturnType<typeof createReducer>>

export default function configureStore(initialState: object = {}, history: History) {
  const router = routerMiddleware(history)
  const store = createStore(createReducer(), initialState, applyMiddleware(thunk, logger, router))
  initAsyncReducers(store)
  const persistor = persistStore(store)
  return { store, persistor }
}
