import { Reducer } from 'redux'
import { PersistConfig, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { SignInActions } from './actions'
import * as Const from './constant'

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
    case Const.SIGNIN_INPROGRESS:
      return state

    case Const.SIGNIN_SUCCESS:
      const { payload: session } = action
      return {
        session,
        ...state
      }

    case Const.SIGNIN_FAIL:
      return state

    default:
      return state
  }
}

export interface Session {
  id: string
  accessToken: string
  userId: string
}

export default {
  [Const.namespace]: persistReducer(persistConfig, reducer)
}
