import { request } from '~/helper/api'
import { Session, Wechat } from '~/model'

export const signIn = (data: { username: string; password: string }) =>
  request.post<Session>('sign/sign-in', data, { notSignIn: true })

export const getUser = () => request.get<Wechat>('sign/get-user')
