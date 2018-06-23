import axios, { AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { apiUrl } from '~/config'
import { generateSignatureHeaders } from '~/helper/api/signature'
import store from '~/store'
import { getSession } from '~/store/modules/session/selectors'

export interface RequestConfig extends AxiosRequestConfig {
  notSignIn?: boolean
}

const request = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
}) as Request

// request
request.interceptors.request.use(
  config => {
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
request.interceptors.response.use(
  response => {
    const { data } = response

    if (data && data.error) {
      return Promise.reject(data.error)
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

export default request

interface Request {
  (config: RequestConfig): AxiosPromise
  (url: string, config?: RequestConfig): AxiosPromise
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<RequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: RequestConfig): Promise<T>
  get<T = any>(url: string, config?: RequestConfig): Promise<T>
  delete(url: string, config?: RequestConfig): Promise<any>
  head(url: string, config?: RequestConfig): Promise<any>
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>
}
