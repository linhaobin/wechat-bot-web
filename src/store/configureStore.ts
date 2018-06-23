import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import createReducer from './rootReducer'
export { default as withReducer } from './withReducer'
import { initAsyncReducers } from './asyncReduces'

const logger = createLogger({})

export type State = ReturnType<ReturnType<typeof createReducer>>

export default function configureStore(initialState: object = {}) {
  const store = createStore(createReducer(), initialState, applyMiddleware(thunk, logger))
  const persistor = persistStore(store)
  initAsyncReducers(store, persistor)

  // if (module.hot) {
  //   module.hot.accept('./rootReducer', () => {
  //     // This fetch the new state of the above reducers.
  //     const nextCreateReducer = require('./rootReducer')
  //     const nextRootReducer = nextCreateReducer()
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return { store, persistor }
}
