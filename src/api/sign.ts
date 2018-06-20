import axios from 'axios'
import { RequestConfig } from '~/api'
import { Session, User } from '~/model'

export const signInApi = (data: { username: string; password: string }) =>
  axios.post<Session>('sign/sign-in', data, { notSignIn: true } as RequestConfig).then(r => r.data)

export const getUser = () => axios.get<User>('sign/get-user').then(r => r.data)
