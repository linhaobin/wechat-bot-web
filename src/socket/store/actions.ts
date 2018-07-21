import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { action, ActionType } from 'typesafe-actions'

import { login as loginSocket } from '~/socket'
import { ActionTypes } from '~/socket/store/constants'
import { RootState } from '~/store'
import * as sessionSelectors from '~/store/modules/session/selectors'

export interface Message<E extends string, T> {
  event: E
  data: T
}

export type ConnectMessage = Message<'connect', undefined>
export type DisconnectMessage = Message<'disconnect', undefined>

/**
 * connect
 */
export const connect = () => action(ActionTypes.CONNECT)

/**
 * login
 */
export const login = () => action(ActionTypes.LOGIN)

/**
 * disconnect
 */
export const disconnect = () => action(ActionTypes.DISCONNECT)

/**
 * message
 */
export const message = (msg: Message<any, any>) => action(ActionTypes.MESSAGE, msg)

/**
 * Actions
 */
export type Actions = ActionType<typeof connect> | ActionType<typeof login> | ActionType<typeof message>

/**
 * connect and login
 */
export type DispatchConnectAndLogin = () => void
export const connectAndLogin: ActionCreator<ThunkAction<void, RootState, undefined, Actions>> = () => async (
  dispatch,
  getState
) => {
  const state = getState()
  const session = sessionSelectors.getSession(state)

  if (!session) {
    throw new Error('connectAndLogin action session is empty')
  }
  
  loginSocket(session)
}
