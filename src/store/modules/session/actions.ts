import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { action, ActionType } from 'typesafe-actions'
import * as signApi from '~/api/sign'
import { Session, Wechat } from '~/model'
import { RootState } from '~/store'
import { ActionTypes } from './constants'
import * as selectors from './selectors'

/**
 * signInInProgress / signInSuccess / signInFail
 */
export const signInInProgress = () => action(ActionTypes.SIGN_IN_IN_PROGRESS)
export const signInSuccess = (session: Session) => action(ActionTypes.SIGN_IN_SUCCESS, session)
export const signInFail = (error: { [key: string]: any }) => action(ActionTypes.SIGN_IN_FAIL, error)
/**
 * getUserInProgress / getUserSuccess / getUserFail
 */
export const getUserInProgress = () => action(ActionTypes.GET_USER_IN_PROGRESS)
export const getUserSuccess = (user: Wechat) => action(ActionTypes.GET_USER_SUCCESS, { user })
export const getUserFail = (error: { [key: string]: any }) => action(ActionTypes.GET_USER_FAIL, { error })

/**
 * Actions
 */
export type Actions = ActionType<
  | typeof signInInProgress
  | typeof signInSuccess
  | typeof signInFail
  | typeof getUserInProgress
  | typeof getUserSuccess
  | typeof getUserFail
>

/**
 * signIn
 */
export interface SignInParams {
  username: string
  password: string
}
export type SignResult = ReturnType<typeof signApi.signIn>
export type DispatchSignIn = (params: SignInParams) => SignResult
export const signIn: ActionCreator<ThunkAction<SignResult, RootState, undefined, Actions>> = (
  params: SignInParams
) => async dispatch => {
  try {
    dispatch(signInInProgress())

    const data = await signApi.signIn(params)

    dispatch(signInSuccess(data))
    return data
  } catch (err) {
    dispatch(signInFail(err))
    throw err
  }
}

/**
 * getUser
 */
type GetUserResult = ReturnType<typeof signApi.getUser>
export type DispatchGetUser = () => GetUserResult
export const getUser: ActionCreator<
  ThunkAction<GetUserResult, RootState, undefined, Actions>
> = () => async dispatch => {
  try {
    dispatch(getUserInProgress())

    const user = await signApi.getUser()

    if (!user) {
      throw new Error('user is empty')
    }

    dispatch(getUserSuccess(user))

    return user
  } catch (error) {
    dispatch(getUserFail(error))
    throw error
    // return { error }
  }
}

/**
 * checkLogin
 */
let checkLoginInProgress = false
let checkLoginListeners: Array<{ resolve: (data: boolean) => void; reject: (data: any) => void }> = []
export const checkLogin: ActionCreator<ThunkAction<Promise<boolean>, RootState, undefined, Actions>> = () => async (
  dispatch,
  getState
) => {
  return new Promise<boolean>(async (resolve, reject) => {
    const state = getState()
    // session 是否存在
    const session = selectors.getSession(state)

    if (!session) return resolve(false)
    // TODO: session 是否过期

    const user = selectors.getUser(state)
    // 是否存在
    if (user) {
      return resolve(true)
    }

    checkLoginListeners.push({
      resolve,
      reject
    })

    // 获取中则监听获取成功
    if (checkLoginInProgress) {
      return
    }

    // 标识为获取中,获取user
    checkLoginInProgress = true
    try {
      await dispatch(getUser())

      // 已登录
      handleResolve(true)
    } catch (error) {
      // 未登录
      handleResolve(false)
    }

    function handleResolve(isLogin: boolean) {
      const listeners = checkLoginListeners
      checkLoginListeners = []
      checkLoginInProgress = false
      listeners.forEach(({ resolve: listenerResolve }) => {
        try {
          listenerResolve(isLogin)
        } catch (error) {
          // tslint:disable-next-line
          console.error(error)
        }
      })
    }
  })
}
