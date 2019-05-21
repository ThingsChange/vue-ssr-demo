import Firebase from 'firebase'
import LRU from 'lru-cache'

const microCache = LRU({ max: 100, maxAge: 5000 }) // 设置数据多久过期<br>})

export function createAPI ({ config, version }) {
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    Firebase.initializeApp(config)
    api = process.__API__ = Firebase.database().ref(version)

    api.onServer = true

    // fetched item cache
    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {}
    ;['top', 'new', 'show', 'ask', 'job'].forEach(type => {
      api.child(`${type}stories`).on('value', snapshot => {
        api.cachedIds[type] = snapshot.val()
      })
    })
  }
  console.log('这里是 api的 的结果-------------', api)
  return api
}
