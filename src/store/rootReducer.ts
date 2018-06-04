import { combineReducers } from 'redux'
import user, { State as UserState } from './reducers/user'

export interface State {
  user: UserState
}

const createReducer = (asyncReducers?: any) =>
  combineReducers<State>({
    user,
    ...asyncReducers
  })

export default createReducer
