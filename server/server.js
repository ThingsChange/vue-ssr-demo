const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const send = require('koa-send')
const router = new Router()

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
  const url = ctx.path

  if (/\w+.[js|css|jpg|jpeg|png|gif|map]/.test(url)) {
    console.log(`proxy ${url}`)
    return await send(ctx, url, { root: path.resolve(__dirname, '../dist') })
  }

  ctx.res.setHeader('Content-Type', 'text/html')
  ctx.res.setHeader('Server', serverInfo)
  const context = {
    title: '我是用来测试vueSSR的',
    url: ctx.url
  }
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context)
  ctx.body = html
}
router.get('*', handleRequest)
module.exports = router
