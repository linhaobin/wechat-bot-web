import axios from 'axios'

export const signInApi = (data: { username: string; password: string }) => axios.post('sign/sign-in', data)
