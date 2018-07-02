import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { initAsyncReducers } from './asyncReduces'
import createReducer from './rootReducer'

const logger = createLogger({})

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
