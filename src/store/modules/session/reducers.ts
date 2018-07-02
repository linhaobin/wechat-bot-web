import { Reducer } from 'redux'
import { PersistConfig, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Session } from '~/model/session'
import { Actions } from './actions'
import { ActionTypes, namespace } from './constants'

const persistConfig: PersistConfig = {
  key: 'session',
  storage,
  whitelist: ['session']
}

export interface State {
  readonly signInInProgress: boolean
  readonly session?: Session
  readonly getUserInProgress: boolean
  readonly user?: object
}

const initialState: State = {
  signInInProgress: false,
  getUserInProgress: false
}

const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN_IN_PROGRESS:
      return {
        ...state,
        signInInProgress: true
      }

    case ActionTypes.SIGN_IN_SUCCESS:
      const { payload: session } = action
      return {
        ...state,
        session,
        signInInProgress: false
      }

    case ActionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        error: action.payload.error,
        signInInProgress: false
      }

    case ActionTypes.GET_USER_IN_PROGRESS:
      return {
        ...state,
        getUserInProgress: true
      }

    case ActionTypes.GET_USER_SUCCESS:
      const { user } = action.payload
      return {
        ...state,
        getUserInProgress: false,
        user
      }

    case ActionTypes.GET_USER_FAIL:
      const { error } = action.payload
      return {
        ...state,
        getUserInProgress: false,
        error
      }

    default:
      return state
  }
}

export default {
  [namespace]: persistReducer(persistConfig, reducer)
}
