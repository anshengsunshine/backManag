import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { ASRequestInterceptors, ASRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class ASRequest {
  instance: AxiosInstance
  interceptors?: ASRequestInterceptors
  showLoading?: boolean
  loading?: LoadingInstance

  constructor(config: ASRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 从 config 中取出的拦截其实对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求成功拦截')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据……',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：响应成功拦截')

        // 将 loading 移除
        this.loading?.close()

        const data = res.data
        if (data.retureCode === '-1001') {
          console.log('请求失败,错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败拦截')
        // 将 loading 移除
        this.loading?.close()
        // 判断不同的 HttpErrorCode 显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }

  request(config: ASRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    if (config.showLoading === false) {
      this.showLoading = DEFAULT_loading
    }

    this.instance
      .request(config)
      .then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        console.log(res)

        // 将 showLoading 设置为 true，这样不会影响下一次请求
        this.showLoading = DEFAULT_LOADING
      })
      .catch((err) => {
        // 将 showLoading 设置为 true，这样不会影响下一次请求
        this.showLoading = DEFAULT_LOADING
        return err
      })
  }
}

export default ASRequest
