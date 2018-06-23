import { combineReducers, ReducersMapObject } from 'redux'
// import layoutReducers from '~/containers/layout/store/reducers'
import sessionReducers from './modules/session/reducers'

// type AsyncReducers = LayoutReducers

const createReducer = (asyncReducers?: ReducersMapObject) =>
  combineReducers({
    ...sessionReducers,
    // ...layoutReducers,
    ...asyncReducers
  })

export default createReducer
