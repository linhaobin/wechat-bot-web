import axios from 'axios'
import { Action, ActionCreator, AnyAction, combineReducers, Dispatch, Reducer } from 'redux'
import { createAction } from 'redux-actions'
import { ThunkAction } from 'redux-thunk'

enum ActionTypeKeys {
  SIGNIN_INPROGRESS = 'SIGNIN_INPROGRESS',
  SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
  SIGNIN_FAIL = 'SIGNIN_FAIL'
}
const signInInProgress = createAction(ActionTypeKeys.SIGNIN_INPROGRESS)
const signInSuccess = createAction(ActionTypeKeys.SIGNIN_SUCCESS)
const signInFail = createAction(ActionTypeKeys.SIGNIN_FAIL)

async function signInApi(data: any) {
  return axios.post('http://127.0.0.1:7001/sign-in', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const signIn: ActionCreator<ThunkAction<Promise<Action>, any, void, AnyAction>> = (data: any) => async (
  dispatch: Dispatch
) => {
  dispatch(signInInProgress())

  try {
    const resp = await signInApi(data)

    return dispatch(signInSuccess(resp))
  } catch (err) {
    return dispatch(signInFail(err))
  }
}

export interface State {
  currentUser: object
}

const currentUser: Reducer<State['currentUser']> = (state = {}, action) => {
  switch (action.type) {
    case ActionTypeKeys.SIGNIN_INPROGRESS:
      return state
    case ActionTypeKeys.SIGNIN_INPROGRESS:
      return state
    case ActionTypeKeys.SIGNIN_INPROGRESS:
      return state
    default:
      return state
  }
}

const reducers = combineReducers<State>({
  currentUser
})

export default reducers
