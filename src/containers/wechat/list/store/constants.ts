export const namespace = 'ui/wechat/list'

/**
 * Action Types
 */
export const enum ActionTypes {
  /**
   * show or hide login dialog
   */
  CHANGE_LOGIN_DIALOG_VISIBLE = 'ui/wechat/list/CHANGE_LOGIN_DIALOG_VISIBLE',
  /**
   * load login qrcode
   */
  LOAD_LOGIN_QRCODE_IN_PROGRESS = 'ui/wechat/list/LOAD_LOGIN_QRCODE_IN_PROGRESS',
  LOAD_LOGIN_QRCODE_SUCCESS = 'ui/wechat/list/LOAD_LOGIN_QRCODE_SUCCESS',
  LOAD_LOGIN_QRCODE_FAIL = 'ui/wechat/list/LOAD_LOGIN_QRCODE_FAIL',

  /**
   * login timeout
   */
  LOGIN_TIMEOUT = 'ui/wechat/list/LOGIN_TIMEOUT',

  /**
   * load table data
   */
  LOAD_TABLE_DATA_IN_PROGRESS = 'ui/wechat/list/LOAD_TABLE_DATA_IN_PROGRESS',
  LOAD_TABLE_DATA_SUCCESS = 'ui/wechat/list/LOAD_TABLE_DATA_SUCCESS',
  LOAD_TABLE_DATA_FAIL = 'ui/wechat/list/LOAD_TABLE_DATA_FAIL',

  /**
   * restart wechat
   */
  RESTART_IN_PROGRESS = 'ui/wechat/list/RESTART_IN_PROGRESS',
  RESTART_SUCCESS = 'ui/wechat/list/RESTART_SUCCESS',
  RESTART_FAIL = 'ui/wechat/list/RESTART_FAIL'
}
