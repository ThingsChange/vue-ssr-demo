/**
 *
 * @author  晴云
 * @create 2018-11-08 9:35
 * @note 干什么的呢？
 **/
const path = require('path')
const url = 'http://your.test.com'
const devServer = {
  open: true,
  noInfo: true,
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  host: '0.0.0.0',
  port: 8084,
  historyApiFallback: {
    rewrites: [
      { from: /\/plateform/, to: '/index.html' }
    ]
  },
  https: false,
  hotOnly: true,
  proxy: {
    // 登录
    'abx': {
      target: 'http://test-hdp-01:8484',
      changeOrigin: true // 是否跨域
    }
  },
  before: app => {
  }
}
module.exports = devServer
