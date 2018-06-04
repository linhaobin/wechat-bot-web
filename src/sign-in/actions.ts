import axios from 'axios'
import { Action, ActionCreator, AnyAction } from 'redux'
import { createAction } from 'redux-actions'
import { ThunkAction } from 'redux-thunk'
import { StoreState } from '../store'

export enum ActionTypes {
  SIGNIN_INPROGRESS = 'SIGNIN_INPROGRESS',
  SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
  SIGNIN_FAIL = 'SIGNIN_FAIL'
}

const signInInProgress = createAction(ActionTypes.SIGNIN_INPROGRESS)
const signInSuccess = createAction(ActionTypes.SIGNIN_SUCCESS)
const signInFail = createAction(ActionTypes.SIGNIN_FAIL)

export const signIn: ActionCreator<ThunkAction<Promise<Action>, StoreState, undefined, AnyAction>> = (data: {
  username: string
  password: string
}) => async dispatch => {
  dispatch(signInInProgress())

  try {
    const resp = await signInApi(data)

    return dispatch(signInSuccess(resp))
  } catch (err) {
    return dispatch(signInFail(err))
  }
}

async function signInApi(data: any) {
  return axios.post('http://127.0.0.1:7001/sign-in', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}
