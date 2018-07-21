import { combineReducers, Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'

import { Wechat } from '~/model'
import * as actions from './actions'
import { ActionTypes, namespace } from './constants'

type Actions = ActionType<typeof actions>

/**
 * login dialog
 */
export interface LoginDialog {
  visible: boolean
  id?: string
  qrcode?: string
  status: number
  // loading: boolean
  error?: any
}
const loginDialog: Reducer<LoginDialog, Actions> = (
  state = {
    visible: false,
    // loading: false,
    qrcode: '',
    status: -1 // -1: loading
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_LOGIN_DIALOG_VISIBLE:
      const { visible } = action.payload
      return {
        ...state,
        visible
      }

    case ActionTypes.LOAD_LOGIN_QRCODE_IN_PROGRESS:
      const { id } = action.payload
      return {
        ...state,
        // loading: true,
        id,
        qrcode: undefined,
        status: -1
      }

    case ActionTypes.LOAD_LOGIN_QRCODE_SUCCESS:
      const { qrcode, status } = action.payload
      return {
        ...state,
        // loading: false,
        qrcode,
        status
      }

    case ActionTypes.LOAD_LOGIN_QRCODE_FAIL:
      const { error } = action.payload
      return {
        ...state,
        // loading: false,
        error
      }

    default:
      return state
  }
}

/**
 * table
 */
export interface Table {
  list: Wechat[]
  loading: boolean
}
const table: Reducer<Table, Actions> = (
  state = {
    list: [],
    loading: false
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOAD_TABLE_DATA_IN_PROGRESS:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.LOAD_TABLE_DATA_SUCCESS:
      const { wechats } = action.payload
      return {
        ...state,
        loading: false,
        list: wechats
      }

    case ActionTypes.LOAD_TABLE_DATA_FAIL:
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error
      }

    default:
      return state
  }
}

export interface State {
  loginDialog: LoginDialog
  table: Table
}
export default {
  [namespace]: combineReducers({
    loginDialog,
    table
  })
}

export interface RootState {
  [namespace]: State
}
