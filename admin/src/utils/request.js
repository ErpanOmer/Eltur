import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import router from '@/router'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost', // api的base_url
  timeout: 15000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code === token 验证失效
  * code === 8888 为服务器返回错误
  * code === 520 表示成功
  * 其他一律为报错
  */
    const responseData = response.data
    if (responseData.code === 0 && !responseData.success) {
      Message({
        message: responseData.message,
        type: 'error',
        duration: 5 * 1000
      })
      router.push({ name: 'Login' })
      return false
    } else if (responseData.code === 8888 && !responseData.success) {
      Message({
        message: responseData.message,
        type: 'error',
        duration: 5 * 1000
      })
      return false
    } else if (responseData.code === 520 && responseData.success) {
      if (responseData.data) {
        return responseData.data
      } else {
        return responseData
      }
    } else {
      return Promise.reject('error')
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
