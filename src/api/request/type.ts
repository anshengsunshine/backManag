import type { AxiosRequestConfig } from 'axios'

export interface ASRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}

export interface ASRequestConfig extends AxiosRequestConfig {
  interceptors?: ASRequestInterceptors
  showLoading?: boolean
}
