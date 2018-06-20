import { Reducer } from 'redux'
import { PersistConfig, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Session } from '~/model/session'
import { SignInActions } from './actions'
import { ActionTypes, namespace } from './constant'

const persistConfig: PersistConfig = {
  key: 'session',
  storage,
  whitelist: ['session']
}

export interface SessionState {
  readonly signInInProgress: boolean
  readonly session?: Session
  readonly user?: object
}

const initialState: SessionState = {
  signInInProgress: false
}

const reducer: Reducer<SessionState, SignInActions> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN_IN_PROGRESS:
      return state

    case ActionTypes.SIGN_IN_SUCCESS:
      const { payload: session } = action
      return {
        session,
        ...state
      }

    case ActionTypes.SIGN_IN_FAIL:
      return state

    default:
      return state
  }
}

export default {
  [namespace]: persistReducer(persistConfig, reducer)
}
