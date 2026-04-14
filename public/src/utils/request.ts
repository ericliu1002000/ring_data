import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios'
import { closeToast, showLoadingToast } from 'vant'
import { TOKEN_KEY } from '@/config'
import { openFailToast } from '@/components/toast/toast'
import type { IApiResponse } from '@/types/common'
import { getStorage } from '@/utils/storage'

interface IRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
}

let loadingCount = 0

/**
 * 打开全局加载状态。
 * @param enable 是否开启加载。
 * @returns 无返回结果。
 */
function startLoading(enable?: boolean): void {
  if (!enable) {
    return
  }

  loadingCount += 1

  if (loadingCount === 1) {
    showLoadingToast({
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner',
      message: '加载中...',
    })
  }
}

/**
 * 关闭全局加载状态。
 * @param enable 是否开启加载。
 * @returns 无返回结果。
 */
function endLoading(enable?: boolean): void {
  if (!enable || loadingCount === 0) {
    return
  }

  loadingCount -= 1

  if (loadingCount === 0) {
    closeToast()
  }
}

/**
 * 获取统一错误文案。
 * @param error Axios 错误对象。
 * @returns 可直接展示的错误消息。
 */
function resolveErrorMessage(error: AxiosError<IApiResponse<unknown>>): string {
  if (error.response?.data?.message) {
    return error.response.data.message
  }

  if (error.code === 'ECONNABORTED') {
    return '请求超时，请稍后重试'
  }

  if (!navigator.onLine) {
    return '网络异常，请检查网络连接'
  }

  return error.message || '服务繁忙，请稍后再试'
}

class HttpClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
      timeout: 15000,
    })

    this.setupInterceptors()
  }

  /**
   * 注册请求与响应拦截器。
   * @param 无入参。
   * @returns 无返回结果。
   */
  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig & IRequestConfig) => {
        startLoading(config.showLoading)

        const token = getStorage<string>(TOKEN_KEY, '')

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error) => Promise.reject(error),
    )

    this.instance.interceptors.response.use(
      (response) => {
        const responseConfig = response.config as InternalAxiosRequestConfig & IRequestConfig
        endLoading(responseConfig.showLoading)

        const responseData = response.data as IApiResponse<unknown>

        if (typeof responseData?.code === 'number' && responseData.code !== 0) {
          if (responseConfig.showError !== false) {
            openFailToast(responseData.message || '请求失败')
          }

          return Promise.reject(responseData)
        }

        return responseData?.data ?? response.data
      },
      (error: AxiosError<IApiResponse<unknown>>) => {
        const errorConfig = error.config as (InternalAxiosRequestConfig & IRequestConfig) | undefined
        endLoading(errorConfig?.showLoading)

        const message = resolveErrorMessage(error)

        if (errorConfig?.showError !== false) {
          openFailToast(message)
        }

        return Promise.reject({
          code: error.response?.status,
          message,
        })
      },
    )
  }

  /**
   * 发起 GET 请求。
   * @param url 请求地址。
   * @param config 请求配置。
   * @returns 泛型响应数据。
   */
  get<T>(url: string, config?: IRequestConfig): Promise<T> {
    return this.instance.get<T, T>(url, config)
  }

  /**
   * 发起 POST 请求。
   * @param url 请求地址。
   * @param data 请求体。
   * @param config 请求配置。
   * @returns 泛型响应数据。
   */
  post<T>(url: string, data?: unknown, config?: IRequestConfig): Promise<T> {
    return this.instance.post<T, T>(url, data, config)
  }
}

export const http = new HttpClient()
