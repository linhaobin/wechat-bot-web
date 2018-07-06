import { ActionCreator, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { action } from 'typesafe-actions'
import { RootState } from '~/store'
import { ActionTypes } from './constants'

import * as wechatApi from '~/api/wechat'
import { Wechat } from '~/model'

/**
 * change login dialog visible action
 */
export const changeLoginDialogVisible = (params: { visible: boolean }) =>
  action(ActionTypes.CHANGE_LOGIN_DIALOG_VISIBLE, params)

/**
 * load qrcode action
 */
export const loadQrcodeProgress = () => action(ActionTypes.LOAD_LOGIN_QRCODE_IN_PROGRESS)
export const loadQrcodeSuccess = (loginResult: wechatApi.ScanResult) =>
  action(ActionTypes.LOAD_LOGIN_QRCODE_SUCCESS, loginResult)
export const loadQrcodeFail = (error: { [key: string]: any }) => action(ActionTypes.LOAD_LOGIN_QRCODE_FAIL, error)

/**
 * load table data action
 */
export const loadTableDataInProgress = () => action(ActionTypes.LOAD_TABLE_DATA_IN_PROGRESS)
export interface LoadTableDataSuccessPayload {
  wechats: Wechat[]
}
export const loadTableDataSuccess = (payload: LoadTableDataSuccessPayload) =>
  action(ActionTypes.LOAD_TABLE_DATA_SUCCESS, payload)
export const loadTableDataFail = (error: { [key: string]: any }) => action(ActionTypes.LOAD_TABLE_DATA_FAIL, { error })

/**
 * open login dialog
 */
export type DispatchOpenLoginDialog = () => void
export const openLoginDialog: ActionCreator<
  ThunkAction<void, RootState, undefined, AnyAction>
> = () => async dispatch => {
  dispatch(changeLoginDialogVisible({ visible: true }))

  try {
    dispatch(loadQrcodeProgress())

    const result = await wechatApi.scan()

    dispatch(loadQrcodeSuccess(result))
  } catch (error) {
    dispatch(loadQrcodeFail(error))
  }
}

/**
 * close login dialog
 */
export type DispatchCloseLoginDialog = () => void
export const closeLoginDialog: ActionCreator<
  ThunkAction<void, RootState, undefined, AnyAction>
> = () => async dispatch => {
  dispatch(changeLoginDialogVisible({ visible: false }))
}

/**
 * load table data
 */
export type DispatchLoadTableData = () => void
export const loadTableData: ActionCreator<
  ThunkAction<void, RootState, undefined, AnyAction>
> = () => async dispatch => {
  try {
    dispatch(loadTableDataInProgress())

    const { wechats } = await wechatApi.getList()

    dispatch(loadTableDataSuccess({ wechats }))
  } catch (error) {
    dispatch(loadTableDataFail(error))
  }
}
