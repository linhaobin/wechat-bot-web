import axios, { AxiosRequestConfig } from 'axios'
import { apiUrl } from '~/config'
import { generateSignatureHeaders } from '~/helper/api/signature'
import store from '~/store'
import { getSession } from '~/store/modules/session/selectors'

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
    if (loginSession && !config.notSignIn) {
      signHeaders = generateSignatureHeaders({ sessionId: loginSession.id, accessToken: loginSession.accessToken })
    } else {
      signHeaders = generateSignatureHeaders()
    }

    config.headers = {
      ...config.headers,
      ...signHeaders
    }

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
      return Promise.reject(data.error)
    }

    return response
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

export interface ApiFailResp {
  error: {
    code: number
    message: string
  }
}
