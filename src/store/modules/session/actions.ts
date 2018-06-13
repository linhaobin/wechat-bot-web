import { push } from 'react-router-redux'
import { ActionCreator } from 'redux'
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
export type SignInActions = ActionType<typeof signInInProgress | typeof signInSuccess | typeof signInFail | typeof push>

/**
 * signIn
 */
export const signIn: ActionCreator<
  ThunkAction<Promise<{ error?: any }>, RootState, undefined, SignInActions>
> = (data: { username: string; password: string }) => async dispatch => {
  dispatch(signInInProgress())

  try {
    const resp = await signInApi(data)

    if (resp.data.error) {
      throw resp.data.error
    }

    await dispatch(signInSuccess(resp.data))

    dispatch(push('/'))

    return {}
  } catch (err) {
    dispatch(signInFail(err))

    return { error: err }
  }
}
