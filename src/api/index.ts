import ASRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const asRequest = new ASRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功的拦截')
      // 携带 token 拦截
      // const token = ''
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      return config
    },
    requestInterceptorCatch(error) {
      console.log('请求失败的拦截')
      return error
    },
    responseInterceptor: (config) => {
      console.log('响应成功的拦截')
      return config
    },
    responseInterceptorCatch(error) {
      console.log('响应失败的拦截')
      return error
    }
  }
})

export default asRequest
