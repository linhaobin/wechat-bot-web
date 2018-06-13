import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { signInApi } from 'src/api/sign'
import { RootState } from 'src/store'
import { action, ActionType } from 'typesafe-actions'
import * as Const from './constant'
import { Session } from './reducers'

/**
 * signInInProgress
 */
export const signInInProgress = () => action(Const.SIGNIN_INPROGRESS)

/**
 * signInSuccess
 */
export const signInSuccess = (session: Session) => action(Const.SIGNIN_SUCCESS, session)

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
