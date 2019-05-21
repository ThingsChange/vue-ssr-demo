import qs from 'qs'
import axios from 'axios'
import md5 from 'md5'
import LRU from 'lru-cache'

const createMicroCache = (maxAge = 5000) => LRU({ max: 100, maxAge })
export function createAPI ({ baseUrl, timeout }) {
  let api
  const microCache = createMicroCache(timeout) // 设置数据多久过期

  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    api = process.__API__ = {
      get (url, params = {}) {
        // url = baseUrl + '/sa' + url
        url = baseUrl + url
        const key = md5(url + JSON.stringify(params))
        // 判断是否有缓存,直接返回缓存结果
        console.log('这里是请求 url的结果-------------', url)
        if (params.cache && microCache.get(key)) {
          console.log('返回缓存')
          return Promise.resolve(microCache.get(key))
        }
        let Cookie = ''
        if (params.req && params.req.headers && params.req.headers.cookie) {
          Cookie = params.req.headers.cookie
        }
        return new Promise((resolve, reject) => {
          axios({
            url,
            params,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Cookie': Cookie
            },
            method: 'get'
          }).then(res => {
            // 判断是否需要缓存 如果需要缓存缓存数据
            if (params.cache && microCache) {
              microCache.set(key, res.data)
            }
            // console.log('这里是 res.data 的结果-------------',123)
            console.log('返回新数据', 'serverAPI')
            resolve(res.data)
          }).catch(error => {
            console.log('这里是 服务端请求失败了呀 的结果-------------', 111111)
            reject(error)
          })
        })
      },
      post (url, params = {}) {
        const key = md5(`${baseUrl}${url}${JSON.stringify(params)}`)
        // 判断是否有缓存,直接返回缓存结果
        if (params.cache && microCache.get(key)) {
          return Promise.resolve(microCache.get(key))
        }
        return new Promise((resolve, reject) => {
          axios({
            url: `${baseUrl}${url}`,
            data: qs.stringify(params),
            method: 'post',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/x-www-form-urlencoded'
              // 'Cookie': parseCookie(SSR.cookies)
            }
          }).then(res => {
            // 判断是否需要缓存 如果需要缓存缓存数据
            if (params.cache && microCache) {
              microCache.set(key, res.data)
            }
            resolve(res.data)
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
    api.onServer = true
  }
  return api
}
