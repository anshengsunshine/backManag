import type { AxiosRequestConfig, AxiosResponse } from "axios"

export interface ASRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface ASRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ASRequestInterceptors<T>
  showLoading?: boolean
}
