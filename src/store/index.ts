import { applyMiddleware, createStore, Reducer, Store } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import createReducer from './rootReducer'
export { default as withReducer } from './withReducer'

const logger = createLogger({})

export type StoreState = ReturnType<ReturnType<typeof createReducer>>

export default function configureStore(initialState: object = {}) {
  const store = createStore(createReducer(), initialState, applyMiddleware(thunk, logger))
  initAsyncReducers(store)
  return store
}

export function injectAsyncReducer(store: Store, name: string, asyncReducer: Reducer) {
  const asyncReducers = getAsyncReducers(store)
  asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(asyncReducers))
}

// async reducers
interface AsyncStore extends Store {
  asyncReducers: {
    [key: string]: Reducer
  }
}
function initAsyncReducers(store: Store) {
  ;(store as AsyncStore).asyncReducers = {}
}

function getAsyncReducers(store: Store) {
  return (store as AsyncStore).asyncReducers
}
