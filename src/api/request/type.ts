import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ASRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface ASRequestConfig extends AxiosRequestConfig {
  interceptors?: ASRequestInterceptors
}
