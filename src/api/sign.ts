import { request } from '~/helper/api'
import { Session, User } from '~/model'

export const signInApi = (data: { username: string; password: string }) =>
  request.post<Session>('sign/sign-in', data, { notSignIn: true })

export const getUser = () => request.get<User>('sign/get-user')
