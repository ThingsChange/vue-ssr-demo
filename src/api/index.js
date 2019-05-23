// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'
// import { createAPI } from './create-api-server'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  baseUrl: 'https://your.test.com',
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
  return api.get('/bsdataopt/datascreen/invest', params)
}
// 借款相关
export function fetchloanMoney (url, params) {
  return api.get('/bsdataopt/datascreen/invest', params)
}
