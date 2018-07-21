import { ActionCreator, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { action } from 'typesafe-actions'
import { v4 as uuid } from 'uuid'

// store
import { RootState } from '~/store'
import { ActionTypes } from './constants'
import * as selectors from './selectors'

// api
import * as wechatApi from '~/api/wechat'
import { Wechat } from '~/model'

// socket
import socket from '~/socket'

/**
 * change login dialog visible action
 */
export const changeLoginDialogVisible = (params: { visible: boolean }) =>
  action(ActionTypes.CHANGE_LOGIN_DIALOG_VISIBLE, params)

/**
 * load qrcode action
 */
export const loadQrcodeProgress = (data: { id: string }) => action(ActionTypes.LOAD_LOGIN_QRCODE_IN_PROGRESS, data)
export const loadQrcodeSuccess = (data: { qrcode: string; status: number }) =>
  action(ActionTypes.LOAD_LOGIN_QRCODE_SUCCESS, data)
export const loadQrcodeFail = (error: { [key: string]: any }) => action(ActionTypes.LOAD_LOGIN_QRCODE_FAIL, error)

/**
 * login timeout
 */
export const loginTimeout = () => action(ActionTypes.LOGIN_TIMEOUT)

/**
 * open login dialog
 */
export type DispatchOpenLoginDialog = () => void
export const openLoginDialog: ActionCreator<ThunkAction<void, RootState, undefined, AnyAction>> = () => async (
  dispatch,
  getState
) => {
  dispatch(changeLoginDialogVisible({ visible: true }))

  try {
    const id = uuid()
    dispatch(loadQrcodeProgress({ id }))

    socket.on(`scan/${id}`, (data: { qrcode: string; status: number; data?: any }) => {
      // tslint:disable-next-line:no-console
      console.info(data)
      const state = getState()

      const loginDialog = selectors.getLoginDialog(state)

      if (loginDialog.id !== id) {
        return
      }

      switch (data.status) {
        case 0:
        case 1:
        case 2:
          dispatch(loadQrcodeSuccess(data))
          break
        case 3:
          dispatch(loginTimeout())
          break
        case 4:
          dispatch(loadQrcodeProgress({ id }))
          break
      }
    })

    socket.on(`login-timeout/${id}`, () => {
      dispatch(loginTimeout())
    })

    await wechatApi.scan({ id })
  } catch (error) {
    dispatch(loadQrcodeFail(error))
  }
}

/**
 * close login dialog
 */
export type DispatchCloseLoginDialog = () => void
export const closeLoginDialog: ActionCreator<ThunkAction<void, RootState, undefined, AnyAction>> = () => async (
  dispatch,
  getState
) => {
  const state = getState()
  const loginDialog = selectors.getLoginDialog(state)

  if (loginDialog.id) {
    socket.off(`scan/${loginDialog.id}`)
    socket.off(`login-timeout/${loginDialog.id}`)
  }

  dispatch(changeLoginDialogVisible({ visible: false }))
}

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

/**
 * restart
 */
export const restartInProgress = () => action(ActionTypes.RESTART_IN_PROGRESS)
export const restartSuccess = () => action(ActionTypes.RESTART_SUCCESS)
export const restartFail = (error: { [key: string]: any }) => action(ActionTypes.RESTART_FAIL, { error })

export type DispatchRestart = (data: { wechatUserId: string }) => void
export const restart: ActionCreator<ThunkAction<void, RootState, undefined, AnyAction>> = ({
  wechatUserId
}: {
  wechatUserId: string
}) => async dispatch => {
  try {
    dispatch(restartInProgress())

    await wechatApi.restart({ wechatUserId })

    dispatch(restartSuccess())
  } catch (error) {
    dispatch(restartFail(error))
  }
}
