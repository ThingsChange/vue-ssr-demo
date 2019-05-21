import { createApp } from './main'
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 设置服务器端 router 的位置

    console.log('这里是 context.url 的结果-------------', context.url)
    router.push(context.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject(new Error('no components matched'))
      }
      Promise.all(
        matchedComponents.map((component) => {
          if (component.asyncData) {
            return component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })
      ).then(() => {
        context.serverError = false
        context.state = store.state
        resolve(app)
      }).catch(error => {
        console.log('服务端渲染失败', 'entry-server')
        context.serverError = true
        resolve(app)
      })
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
    })
  })
}
