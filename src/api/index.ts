import ASRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"

import localCache from "@/utils/cache"

const asRequest = new ASRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带 token 拦截
      const token = localCache.getCache("token")
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    responseInterceptor: (config) => {
      return config
    },
    responseInterceptorCatch(error) {
      return error
    }
  }
})

export default asRequest
