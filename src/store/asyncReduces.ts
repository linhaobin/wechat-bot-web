import { Reducer, ReducersMapObject, Store } from 'redux'
import createReducer from './rootReducer'

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

export function initAsyncReducers(store: Store) {
  ;(store as AsyncStore).asyncReducers = {}
}

// async reducers
interface AsyncStore extends Store {
  asyncReducers: {
    [key: string]: Reducer
  }
}

function getAsyncReducers(store: Store) {
  return (store as AsyncStore).asyncReducers
}
