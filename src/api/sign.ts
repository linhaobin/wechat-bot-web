import axios from 'axios'
import Session from '~/model/session'
import { RequestConfig } from './base'

export const signInApi = (data: { username: string; password: string }) =>
  axios.post<Session>('sign/sign-in', data, { notSignIn: true } as RequestConfig)
