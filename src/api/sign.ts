import axios from 'axios'
import { RequestConfig } from './base'

export const signInApi = (data: { username: string; password: string }) =>
  axios.post('sign/sign-in', data, { notSignIn: true } as RequestConfig)
