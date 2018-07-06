import { request } from '~/helper/api'
import { Wechat } from '~/model'

/**
 * scan
 */
export interface ScanResult {
  qrcode: string
  status: number
}
export const scan = () => request.get<ScanResult>('wechat/scan')

/**
 * getList
 */
export interface GetListResult {
  wechats: Wechat[]
}
export const getList = () => request.get<GetListResult>('wechat')
