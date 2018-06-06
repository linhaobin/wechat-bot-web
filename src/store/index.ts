import { applyMiddleware, createStore, Reducer, ReducersMapObject, Store } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import createReducer from './rootReducer'
export { default as withReducer } from './withReducer'

const logger = createLogger({})

export type RootState = ReturnType<ReturnType<typeof createReducer>>

export default function configureStore(initialState: object = {}) {
  const store = createStore(createReducer(), initialState, applyMiddleware(thunk, logger))
  initAsyncReducers(store)
  return store
}

export function injectAsyncReducer(store: Store, options: string | ReducersMapObject, asyncReducer?: Reducer) {
  const asyncReducers = getAsyncReducers(store)
  if (typeof options === 'string') {
    if (!asyncReducer) throw new Error('参数错误，第一个参数为string时，第二参数不能为空')

    asyncReducers[name] = asyncReducer
  } else {
    Object.keys(options).forEach(key => {
      asyncReducers[key] = options[key]
    })
  }
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
