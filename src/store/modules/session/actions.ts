import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { action, ActionType } from 'typesafe-actions'
import { signInApi } from '~/api/sign'
import { Session } from '~/model/session'
import { RootState } from '~/store'
import { ActionTypes } from './constants'

/**
 * signInInProgress
 */
export const signInInProgress = () => action(ActionTypes.SIGN_IN_IN_PROGRESS)

/**
 * signInSuccess
 */
export const signInSuccess = (session: Session) => action(ActionTypes.SIGN_IN_SUCCESS, session)

/**
 * signInFail
 */
export const signInFail = (error: { [key: string]: any }) => action(ActionTypes.SIGN_IN_FAIL, error)

/**
 * signInActions
 */
export type SignInActions = ActionType<typeof signInInProgress | typeof signInSuccess | typeof signInFail>

/**
 * signIn
 */
export interface SignInParams {
  username: string
  password: string
}
export type SignResult = Promise<ActionType<typeof signInSuccess | typeof signInFail>>
export type DispatchSignIn = (params: SignInParams) => SignResult
export const signIn: ActionCreator<ThunkAction<SignResult, RootState, undefined, SignInActions>> = (
  params: SignInParams
) => async dispatch => {
  dispatch(signInInProgress())

  try {
    const data = await signInApi(params)

    return dispatch(signInSuccess(data))
  } catch (err) {
    return dispatch(signInFail(err))
  }
}
