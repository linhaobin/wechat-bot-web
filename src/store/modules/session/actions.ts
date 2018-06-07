import axios from 'axios'
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from 'src/store'
import { action, ActionType } from 'typesafe-actions'
import * as Const from './constant'

/**
 * signInInProgress
 */
export const signInInProgress = () => action(Const.SIGNIN_INPROGRESS)

/**
 * signInSuccess
 */
export const signInSuccess = ({ accessToken }: { accessToken: string }) => action(Const.SIGNIN_SUCCESS, { accessToken })

/**
 * signInFail
 */
export const signInFail = (error: any) => action(Const.SIGNIN_FAIL, error)

/**
 * signInActions
 */
export type SignInActions = ActionType<typeof signInInProgress | typeof signInSuccess | typeof signInFail>

/**
 * signIn
 */
export const signIn: ActionCreator<ThunkAction<Promise<Action>, RootState, undefined, SignInActions>> = (data: {
  username: string
  password: string
}) => async dispatch => {
  dispatch(signInInProgress())

  try {
    const resp = await signInApi(data)

    if (resp.data.error) {
      throw resp.data.error
    }

    return dispatch(signInSuccess(resp.data))
  } catch (err) {
    return dispatch(signInFail(err))
  }
}

async function signInApi(data: any) {
  return axios.post('http://127.0.0.1:7001/sign-in', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}
