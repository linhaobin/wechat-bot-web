import { Reducer } from 'redux'
import { SignInActions } from './actions'
import * as Const from './constant'

interface SessionState {
  readonly signInInProgress: boolean
  readonly accessToken?: string
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
      const {
        payload: { accessToken }
      } = action
      return {
        accessToken,
        ...state
      }

    case Const.SIGNIN_FAIL:
      return state

    default:
      return state
  }
}

export default {
  [Const.namespace]: reducer
}
