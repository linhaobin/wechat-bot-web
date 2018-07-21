import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'
import { ActionTypes, namespace } from './constants'

type Actions = ActionType<typeof actions>

export interface State {
  connected: boolean
  login: boolean
}
const reducer: Reducer<State, Actions> = (
  state = {
    connected: false,
    login: false
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CONNECT:
      return {
        ...state,
        connected: true
      }

    case ActionTypes.LOGIN:
      return {
        ...state,
        login: true
      }

    case ActionTypes.DISCONNECT:
      return {
        ...state,
        connected: false,
        login: false
      }

    default:
      return state
  }
}

export default {
  [namespace]: reducer
}

export interface RootState {
  [namespace]: State
}
