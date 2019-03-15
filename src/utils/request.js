import Axios from 'axios'
import util from './util'

/**
 * 请求拦截器
 * @param pending     用于存储请求标识
 * @param cancelToken CancelToken构造函数创建取消令牌
 * @param removePending  清除令牌标识
 */

const pending = []
const cancelToken = Axios.CancelToken
const removePending = config => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      //当当前请求在数组中存在时执行函数体
      pending[p].f() //执行取消操作
      pending.splice(p, 1) //把这条记录从数组中移除
    }
  }
}

// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    removePending(config)
    config.cancelToken = new cancelToken(c => {
      // 拼接标识字符串 和 传递清除回调
      pending.push({ u: config.url + '&' + config.method, f: c })
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
Axios.interceptors.response.use(
  response => {
    removePending(response.config)
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

Axios.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      return response.data
    }
    const error = new Error(response.statusText)
    error.response = response
    return error
  },
  error => {
    return Promise.resolve(error.response)
  }
)

/**
 * 公用封装的axios
 * @param {string} url       请求路径
 * @param {string} [options] 参数对象
 */

export function axios(url, options) {
  const { method, headers, data } = options
  return new Promise((resolve, reject) => {
    Axios({
      url,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...(headers || {}) },
      method: method || 'GET',
      data: data || {}
    })
      .then(res => {
        if (res.code == '10401') {
          util.removeCookie('user')
          util.removeCookie('token')
          window.location.hash = '/login'
          reject()
        }
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
