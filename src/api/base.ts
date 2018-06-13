import axios from 'axios'
import * as sha1 from 'sha1'
import { apiUrl } from 'src/config'
import store from 'src/store'
import { getSession } from 'src/store/modules/session/selectors'

export const SESSION_ID_KEY = 'session-id'
export const SIGNATURE_KEY = 'signature'
export const TIMESTAMP_KEY = 'timestamp'
export const NONCE_KEY = 'nonce'

// api url
axios.defaults.baseURL = apiUrl
// content-type default to json
axios.defaults.headers = { 'Content-Type': 'application/json' }
// signature
axios.interceptors.request.use(
  config => {
    const loginSession = getSession(store.getState())

    let signHeaders
    if (loginSession) {
      signHeaders = generateSignatureHeaders({ sessionId: loginSession.id, accessToken: loginSession.accessToken })
    } else {
      signHeaders = generateSignatureHeaders()
    }
    config.headers = {
      ...config.headers,
      ...signHeaders
    }
    return config
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

interface GenerateSignatureHeaders {
  (): Headers
  (params: Params): Headers & { sessionId: string }
}
export const generateSignatureHeaders: GenerateSignatureHeaders = (params?: Params) => {
  const nonce = createNonceStr()
  const timestamp = createTimestamp()

  const args = [nonce, timestamp]
  if (params) {
    args.push(params.accessToken, params.sessionId)
  }

  const str = args.sort().join('')
  const signature = sha1(str)

  const result: any = {
    nonce,
    timestamp,
    signature
  }

  if (params) {
    result.sessionId = params.sessionId
  }

  return result
}

interface Params {
  accessToken: string
  sessionId: string
}
interface Headers {
  nonce: string
  timestamp: string
  signature: string
}

// 生成随机数字符串
function createNonceStr() {
  return Math.random()
    .toString(36)
    .substr(2, 15)
}

// 生成时间戳字符串
function createTimestamp() {
  return new Date().getTime() + ''
}
