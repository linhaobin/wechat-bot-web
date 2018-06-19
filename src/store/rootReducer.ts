import { combineReducers, ReducersMapObject } from 'redux'
import session from './modules/session/reducers'

const createReducer = (asyncReducers?: ReducersMapObject) =>
  combineReducers({
    ...session,
    ...asyncReducers,
  })

export default createReducer
