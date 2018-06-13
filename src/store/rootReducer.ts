import { routerReducer } from 'react-router-redux'
import { combineReducers, ReducersMapObject } from 'redux'
import session from './modules/session/reducers'

const createReducer = (asyncReducers?: ReducersMapObject) =>
  combineReducers({
    ...session,
    ...asyncReducers,
    router: routerReducer
  })

export default createReducer
