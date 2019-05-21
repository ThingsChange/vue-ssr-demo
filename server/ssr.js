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

const _cors = (ctx, next) => {
  // 指定服务器端允许进行跨域资源访问的来源域。可以用通配符*表示允许任何域的JavaScript访问资源，但是在响应一个携带身份信息(Credential)的HTTP请求时，必需指定具体的域，不能用通配符
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  // ctx.set('Access-Control-Allow-Origin', 'https://bigdata.kaiyuan.net')
  // 指定服务器允许进行跨域资源访问的请求方法列表，一般用在响应预检请求上
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,HEAD,DELETE,PUT')

  // 必需。指定服务器允许进行跨域资源访问的请求头列表，一般用在响应预检请求上
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
  //
  // // 告诉客户端返回数据的MIME的类型，这只是一个标识信息,并不是真正的数据文件的一部分
  // ctx.set('Content-Type', 'application/json;charset=utf-8')
  //
  // // 可选，单位为秒，指定浏览器在本次预检请求的有效期内，无需再发送预检请求进行协商，直接用本次协商结果即可。当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // ctx.set('Access-Control-Max-Age', 300)
  //
  // // 可选。它的值是一个布尔值，表示是否允许客户端跨域请求时携带身份信息(Cookie或者HTTP认证信息)。默认情况下，Cookie不包括在CORS请求之中。当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";如果没有设置这个值，浏览器会忽略此次响应。
  // ctx.set('Access-Control-Allow-Credentials', true)
  //
  // // 可选。跨域请求时，客户端xhr对象的getResponseHeader()方法只能拿到6个基本字段，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。要获取其他字段时，使用Access-Control-Expose-Headers，xhr.getResponseHeader('myData')可以返回我们所需的值
  // ctx.set('Access-Control-Expose-Headers', 'myData')

  next()
}

// const main = function (ctx) {
//   const _method = ctx.request.method
//   ctx.response.body = { '请求方式': _method }
// }

// app.use(main)
app.use(router.routes()).use(router.allowedMethods())
app.use(_cors)

// 开放目录
app.use(koaStatic(resolve('../dist')))
app.use(koaStatic(resolve('../public')))
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

module.exports = app
