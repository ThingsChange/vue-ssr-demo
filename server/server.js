const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const send = require('koa-send')
const router = new Router()
const LRU = require('lru-cache')
let service = require('./WebAppService.js')// 引用WebAppService.js

const microCache = LRU({
  max: 100, // 最大缓存的数目
  maxAge: 1000 // 重要提示：条目在 1 秒后过期。
})
const isCacheable = req => {
  // 判断是否需要页面缓存
  if (req.url && req.url === '/') {
    return req.url
  } else {
    return false
  }
}
const resolve = file => path.resolve(__dirname, file)

const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`
// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('../src/index.template.html'), 'utf-8'),
  clientManifest: clientManifest
})

function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

// 第 3 步：添加一个中间件来处理所有请求
const handleRequest = async (ctx, next) => {
  const req = ctx.req
  const res = ctx.res
  const cacheable = isCacheable(req)
  if (cacheable) {
    const hit = microCache.get(res.url)
    if (hit) {
      return res.end(hit)
    }
  }
  const errorHandler = err => {
    if (err && err.code === 404) {
      // 未找到页面
      res.status(404).sendfile('public/404.html')
    } else {
      // 页面渲染错误
      res.status(500).end('500 - Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err)
    }
  }
  const url = ctx.path

  if (/\w+\.(js|css|jpg|jpeg|png|gif|map)/.test(url)) {
    console.log(`proxy1 ${url}`)
    return await send(ctx, url, { root: path.resolve(__dirname, '../dist') })
  }
  console.log(`proxy ${url}`)
  if (/\/bsdataopt/.test(url)) {
    console.log('这里是 接口 的结果-------------', 1111111111, ctx.url)
    ctx.set('Cache-Control', 'no-cache')
    ctx.set('Access-Control-Allow-Origin', '*')
    var querystring = require('querystring')
    var params = querystring.parse(ctx.req._parsedUrl.query)
    var key = params.key
    var start = params.start
    var end = params.end
    let link = (a, data) => ctx.body = data
    let a = await service.get_search_data(key, start, end)

    console.log('这里是 a 的结果-------------', ctx.body, a.data)
    ctx.body = a.data
    return ctx.body
  }

  ctx.res.setHeader('Content-Type', 'text/html')
  ctx.res.setHeader('Server', serverInfo)
  const context = {
    title: '我是用来测试vueSSR的',
    url: ctx.url
  }
  console.log('这里是 服务端渲染 的结果-------------', 222222222222222222222222)

  console.log('这里是 context 的结果-------------', context)
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context, (err, html) => {
    if (err) {
      return errorHandler(err)
    }
    console.log('这里是 服务端渲染完毕2 的结果-------------', '服务端渲染完毕')
    microCache.set(req.url, html) // 设置当前缓存页面的内容
  })
  console.log('这里是 返回浏览器 的结果-------------', '返回给浏览器')
  ctx.body = html
}
router.get('*', handleRequest)
module.exports = router
