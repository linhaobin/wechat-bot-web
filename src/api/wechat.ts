import { request } from '~/helper/api'
import { Wechat } from '~/model'

/**
 * getList
 */
export interface GetListResult {
  wechats: Wechat[]
}
export const getList = () => request.get<GetListResult>('wechat')
/**
 * scan
 */
export const scan = (data: { id: string }) => request.post<void>('wechat/scan', data)

/**
 * restart
 */
export const restart = (data: { wechatUserId: string }) => request.post<void>('wechat/restart', data)
