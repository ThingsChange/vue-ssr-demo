const Koa = require('koa')
const koaStatic = require('koa-static')
const path = require('path')
const microcache = require('route-cache')
const useMicroCache = process.env.MICRO_CACHE !== 'false'
// console.log('这里是 打包开始被 的结果-------------', 打包开始被)
const resolve = file => path.resolve(__dirname, file)
const app = new Koa()

const isDev = process.env.NODE_ENV !== 'production'
const router = isDev ? require('./dev.ssr') : require('./server')

app.use(router.routes()).use(router.allowedMethods())
// 开放目录
app.use(koaStatic(resolve('../dist')))
app.use(koaStatic(resolve('../public')))
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

module.exports = app
