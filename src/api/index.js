// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'
// import { createAPI } from './create-api-server'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  baseUrl: 'https://bigdata.kaiyuan.net',
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

function fetch (child) {
  logRequests && console.log(`fetching ${child}...`)
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchIdsByType (type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}

export function watchList (type, cb) {
  let first = true
  const ref = api.child(`${type}stories`)
  const handler = snapshot => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }
  ref.on('value', handler)
  return () => {
    ref.off('value', handler)
  }
}
