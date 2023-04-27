import axios from 'axios'

/**
 * @description: 创建axios实例，可根据不同的配置创建多个实例
 * @param options 实例配置项：baseURL, timeout, headers, ...
 * @returns {AxiosInstance}
 */
export function createAxios(options = {}) {
  const instance = axios.create({
    timeout: 12000,
    ...options,
  })
  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 在发送请求之前：设置请求头、添加请求参数、处理跨域问题等
      return config
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error)
    },
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 对响应数据做点什么：检查响应状态码、解析响应数据等
      return response
    },
    (error) => {
      // 对响应错误做点什么
      return Promise.reject(error)
    },
  )
  return instance
}

/**
 * @description: 创建默认axios实例
 * @type {AxiosInstance}
 */
export const request = createAxios({
  baseURL: '/',
})
