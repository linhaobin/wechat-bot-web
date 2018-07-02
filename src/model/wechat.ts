export enum WechatStatus {
  Login = 1,
  Logout = 2
}

export interface Wechat {
  user_id: string
  wechatUserId: string // 微信用户id
  name: string // 名称
  status: WechatStatus
  session_id: string // wechaty profile
}
