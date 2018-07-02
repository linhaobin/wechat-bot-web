import { request } from '~/helper/api'
import { Wechat } from '~/model'

/**
 * login
 */
export interface LoginResult {
  qrcode: string
  status: number
}
export const login = () => request.get<LoginResult>('wechat/login')

/**
 * getList
 */
export interface GetListResult {
  wechats: Wechat[]
}
export const getList = () => request.get<GetListResult>('wechat')
