/**
 *
 * @author  晴云
 * @create 2019-04-02 11:59
 * @note 干什么的呢？
 **/
import Vue from 'vue'
import 'es6-promise/auto'
// 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中：
import { createApp } from './main'
// import ProgressBar from './components/ProgressBar.vue'
// global progress bar
// const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
// document.body.appendChild(bar.$el)
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
        req: {}
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

// 客户端特定引导逻辑……

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  console.log('这里是 自动序列化的结果 的结果-------------', window.__INITIAL_STATE__, window.__serverRenderError, window.__serverRenderError__)
  console.log('这里是 自动序列化的结果 的结果-------------', window)
  store.replaceState(window.__INITIAL_STATE__)
}

// node报错时前端路由重渲染
function feCompatibleRender (route) {
  let matched = router.getMatchedComponents(route)
  console.log('前端兼容渲染执行')
  Promise.all(matched.map(c => {
    if (c.asyncData) {
      return c.asyncData({
        store,
        route,
        req: {
          headers: {
            cookie: document.cookie
          }
        }
      })
    }
  })).then(() => {
    console.log('ok')
  }).catch((e) => {
    console.error(e)
  })
}
// wait until router has resolved all async before hooks
// and async components...
router.onReady((currentRoute) => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    console.log('before resolve invoked')
    debugger
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    // bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        // bar.finish()
        next()
      })
      .catch(next)
  })

  // 如果拿到服务端的错误状态，则执行客户端渲染程序
  if (window.__serverRenderError) {
    feCompatibleRender(currentRoute)
  }
  // 这里假定 App.vue 模板中根元素具有 `id="app"`
  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if (location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
