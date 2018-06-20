import * as sha1 from 'sha1'

export const SESSION_ID_KEY = 'session-id'
export const SIGNATURE_KEY = 'signature'
export const TIMESTAMP_KEY = 'timestamp'
export const NONCE_KEY = 'nonce'

interface SignatureHeaders {
  [SIGNATURE_KEY]: string
  [TIMESTAMP_KEY]: string
  [NONCE_KEY]: string
  [SESSION_ID_KEY]: string
}
interface GenerateSignatureHeadersParams {
  sessionId: string
  accessToken: string
}
interface GenerateSignatureHeaders {
  (): Omit<SignatureHeaders, 'session-id'>
  (params: GenerateSignatureHeadersParams): SignatureHeaders
}
export const generateSignatureHeaders: GenerateSignatureHeaders = (params?: GenerateSignatureHeadersParams) => {
  const sign = generateSignature(params)

  const headers: any = {
    [SIGNATURE_KEY]: sign.signature,
    [TIMESTAMP_KEY]: sign.timestamp,
    [NONCE_KEY]: sign.nonce
  }
  if (params) {
    headers[SESSION_ID_KEY] = params.sessionId
  }
  return headers
}
// 生成密钥
export const generateSignature = (params?: { accessToken: string; sessionId: string }) => {
  const nonce = createNonceStr()
  const timestamp = createTimestamp()

  const args = [nonce, timestamp]
  if (params) {
    args.push(params.accessToken, params.sessionId)
  }

  const str = args.sort().join('')
  const signature = sha1(str) as string

  const result = {
    nonce,
    timestamp,
    signature
  }

  return result
}
// 生成随机数字符串
export function createNonceStr() {
  return Math.random()
    .toString(36)
    .substr(2, 15)
}

// 生成时间戳字符串
export function createTimestamp() {
  return new Date().getTime() + ''
}
