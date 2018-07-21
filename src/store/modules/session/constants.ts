export const namespace = 'app/session'

/**
 * Action Types
 */
export const enum ActionTypes {
  /**
   * sign in
   */
  SIGN_IN_IN_PROGRESS = 'app/session/SIGN_IN_IN_PROGRESS',
  SIGN_IN_SUCCESS = 'app/session/SIGN_IN_SUCCESS',
  SIGN_IN_FAIL = 'app/session/SIGN_IN_FAIL',
  /**
   * sign out
   */
  SIGN_OUT_IN_PROGRESS = 'app/session/SIGN_OUT_IN_PROGRESS',
  SIGN_OUT_SUCCESS = 'app/session/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAIL = 'app/session/SIGN_OUT_FAIL',
  /**
   * get user
   */
  GET_USER_IN_PROGRESS = 'app/session/GET_USER_IN_PROGRESS',
  GET_USER_SUCCESS = 'app/session/GET_USER_SUCCESS',
  GET_USER_FAIL = 'app/session/GET_USER_FAIL'
}
