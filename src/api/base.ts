import axios, { AxiosRequestConfig } from 'axios'
import * as sha1 from 'sha1'
import { apiUrl } from '~/config'
import store from '~/store'
import { getSession } from '~/store/modules/session/selectors'

export const SESSION_ID_KEY = 'session-id'
export const SIGNATURE_KEY = 'signature'
export const TIMESTAMP_KEY = 'timestamp'
export const NONCE_KEY = 'nonce'

// export type ApiResp<T> = T | Partial<ApiFailResp>
// export const isError = (data: ApiResp<any>): data is ApiFailResp => {
//   if ((data as any).error) {
//     return true
//   }

//   return false
// }

export interface RequestConfig extends AxiosRequestConfig {
  notSignIn?: boolean
}
// api url
axios.defaults.baseURL = apiUrl
// content-type default to json
axios.defaults.headers = { 'Content-Type': 'application/json' }

// signature
axios.interceptors.request.use(
  (config: RequestConfig) => {
    const loginSession = getSession(store.getState())

    let signHeaders
    if (loginSession && config.notSignIn) {
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

// response
axios.interceptors.response.use(
  response => {
    const { data } = response

    if (data && data.error) {
      return Promise.reject(data)
    }

    return data
  },
  error => {
    if (error && error.code && error.message) {
      return Promise.reject(error)
    }
    if (process.env.NODE_ENV !== 'production') {
      // tslint:disable-next-line
      console.error(error)
    }
    return Promise.reject({
      code: 500,
      message: '服务器繁忙'
    })
  }
)
interface SignatureHeaders {
  nonce: string
  timestamp: string
  signature: string
}
interface GenerateSignatureHeadersParams {
  accessToken: string
  sessionId: string
}
interface GenerateSignatureHeaders {
  (): SignatureHeaders
  (params: GenerateSignatureHeadersParams): SignatureHeaders & { sessionId: string }
}
export const generateSignatureHeaders: GenerateSignatureHeaders = (params?: GenerateSignatureHeadersParams) => {
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
