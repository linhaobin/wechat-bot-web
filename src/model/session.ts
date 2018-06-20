export interface Session {
  id: string
  userId: string
  accessToken: string
  expire: number
  expireAt: number
}
