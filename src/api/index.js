// this is aliased in webpack config based on server/client build
// import { createAPI } from 'create-api'
import { createAPI } from './create-api-server'

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'

const logRequests = !!process.env.DEBUG_API
console.log('这里是 logRequests 的结果-------------', logRequests)

const api = createAPI({
  baseUrl: 'https://dohko.m.hualala.com',
  timeout: 8000
})

/* // warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
  warmCache()
}

function warmCache () {
  console.log('这里是 api.cachedIds 的结果-------------', api.cachedIds)
  fetchItems((api.cachedIds.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
} */

// 投资相关
export function fetchInvest (url, params) {
  console.log('这里是 params 11111111111111 的结果-------------', params)
  let a = api.get('/orh5/qrcode/info?s=100549_I7V4&groupID=11157', params)
  console.log('这里是 a 的结果-------------', a)
  return a
}
// 借款相关
export function fetchloanMoney (url, params) {
  return api.get('/bsdataopt/datascreen/invest', params)
}

export function fetchUser (url, params) {
  console.log('这里是 params 11111111111111 的结果-------------', params)
  return api.get('/bsdataopt/datascreen/invest', params)
}
export function fetchItem (url, params) {
  console.log('这里是 params 11111111111111 的结果-------------', params)
  return api.get('/bsdataopt/datascreen/invest', params)
}
export function fetchItems (url, params) {
  console.log('这里是 params 11111111111111 的结果-------------', params)
  return api.get('/bsdataopt/datascreen/invest', params)
}
export function fetchIdsByType (url, params) {
  console.log('这里是 params 11111111111111 的结果-------------', params)
  return api.get('/bsdataopt/datascreen/invest', params)
}
