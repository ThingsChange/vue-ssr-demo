/**
 *
 * @author  晴云
 * @create 2018-11-08 9:35
 * @note 干什么的呢？
 **/
const path = require('path')
const url = 'https://bigdata.kaiyuan.net'
const interfaceInvoke = {}
const interfacePre = [
  '/kydc-zuul',
  '/bsdataopt/',
  '/report/',
  '/mysql',
  '/kydc-base/',
  '/monitor/',
  '/monitorbusiness/',
  '/dataApi',
  '/admin',
  '/component'
].forEach(v => {
  interfaceInvoke[v] = {
    target: url,
    changeOrigin: true // 是否跨域}
  }
})
const devServer = {
  open: true,
  // lazy: true,
  // filename: 'bundle.js',
  noInfo: true,
  // clientLogLevel: 'none',
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  host: '0.0.0.0',
  port: 8084,
  historyApiFallback: {
    rewrites: [
      { from: /\/plateform/, to: '/index.html' }
      // { from: /\/achievement/, to: '/index.html' }
    ]
  },
  https: false,
  hotOnly: true,
  proxy: interfaceInvoke,
  before: app => {
  }
}
module.exports = devServer
