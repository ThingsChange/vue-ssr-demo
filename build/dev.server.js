/**
 *
 * @author  晴云
 * @create 2018-11-08 9:35
 * @note 干什么的呢？
 **/
const path = require('path')
const url = 'http://bigdata.ky.com'
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
  proxy: {
    // 登录
    '/kydc-zuul': {
      // target: 'http://bigdata.ky.com',
      target: 'http://test-hdp-01:8484',
      changeOrigin: true // 是否跨域
    },
    /*  '/bsdataopt/achievement': {
      target: 'http://172.16.71.143:8484',
      // pathRewrite: { '^/bsdataopt': '' },
      changeOrigin: true // 是否跨域
    },
    '/bsdataopt/getLlsDate/': {
      // target: 'http://172.16.71.26:8282',
      // target: 'http://bigdata.ky.com',
      target: 'http://test-hdp-01:8484',
      // pathRewrite: { '^/bsdataopt': '' },
      changeOrigin: true // 是否跨域
    },
    '/bsdataopt/branch/': {
      target: 'http://172.16.82.139:8282',
      // target: 'http://test-hdp-01:8484',
      pathRewrite: { '^/bsdataopt': '' },
      changeOrigin: true // 是否跨域
    },
    '/bsdataopt/lls/': {
      target: 'http://172.16.82.139:8282',
      // target: 'http://test-hdp-01:8484',
      pathRewrite: { '^/bsdataopt': '' },
      changeOrigin: true // 是否跨域
    },
    '/bsdataopt/employee/': {
      target: 'http://172.16.82.139:8282',
      // target: 'http://test-hdp-01:8484',
      pathRewrite: { '^/bsdataopt': '' },
      changeOrigin: true // 是否跨域
    },
    '/bsdataopt/jmd/': {
      target: 'http://172.16.82.139:8282',
      // target: 'http://test-hdp-01:8484',
      pathRewrite: { '^/bsdataopt': '' },
      changeOrigin: true // 是否跨域
    },
    '/bsdataopt/agent/': {
      target: 'http://172.16.82.139:8282',
      // target: 'http://test-hdp-01:8484',
      pathRewrite: { '^/bsdataopt': '' },
      changeOrigin: true // 是否跨域
    }, */
    '/bsdataopt/': {
      target: 'http://test-hdp-01:8484',
      // target: 'http://172.16.71.143:8484',
      // target: 'http://172.16.82.139:8282',
      changeOrigin: true
    },
    '/hive/': {
      // target: 'http://bigdata.ky.com',
      // target: 'http://172.16.82.139:9595',
      target: 'http://172.16.71.194:9595',
      changeOrigin: true
    },
    '/apply/': {
      // target: 'http://bigdata.ky.com',
      // target: 'http://172.16.82.139:9595',
      target: 'http://172.16.71.194:9595',
      changeOrigin: true
    },
    '/report/': {
      target: 'http://test-hdp-01:8484',
      changeOrigin: true // 是否跨域
    },
    '/mysql': {
      target: 'http://test-hdp-01:8484',
      changeOrigin: true // 是否跨域
    },
    '/kydc-base/': {
      target: 'http://test-hdp-01:8484',
      // target: 'http://bigdata.ky.com',
      changeOrigin: true // 是否跨域
    },
    '/monitor/': {
      // target: 'http://bigdata.ky.com',
      target: 'http://test-hdp-01:8484',
      changeOrigin: true // 是否跨域
    },
    '/monitorbusiness/': {
      // target: 'http://bigdata.ky.com',
      target: 'http://test-hdp-01:8484',
      changeOrigin: true // 是否跨域
    },
    // 字段管理
    /*
     '/sparksql': {
     target: 'http://172.16.35.112:8888',
     // target: 'http://bigdata.ky.com',
     changeOrigin: true // 是否跨域

     },
     '/sparkJar': {
     target: 'http://172.16.8.47:8888'
     },
     '/app': {
     target: 'http://172.16.20.123:8080'
     },
     '/mysql': {
     target: 'http://172.16.20.49:8888'
     },
     // 修改监控消息状态
     '/backend-ncs/': {
     target: 'http://172.16.82.121:6790',
     // target: 'http://bigdata.ky.com',
     changeOrigin: true // 是否跨域
     },
     '/hdfs-content': {
     target: 'http://172.16.8.67:9093'
     },
     '/livyBatch': {
     // target: 'http://172.16.8.47:8383'
     target: 'http://bigdata.ky.com',
     changeOrigin: true // 是否跨域
     },
     '/livy': {
     // target: 'http://172.16.8.47:8383'
     target: 'http://bigdata.ky.com',
     changeOrigin: true // 是否跨域
     },
     */
    '/dataApi': {
      target: 'http://test-hdp-01:8484',
      // target: 'http://bigdata.ky.com',
      changeOrigin: true // 是否跨域
    },
    '/admin': {
      // target: 'http://bigdata.ky.com',
      target: 'http://test-hdp-01:8484',
      changeOrigin: true // 是否跨域
    },
    '/component': {
      target: 'http://test-hdp-01:8484',
      // target: 'http://172.16.71.143',
      changeOrigin: true // 是否跨域
    }
    /*    '/': {
     target: 'http://test-hdp-01:8484',
     changeOrigin: true // 是否跨域
     } */
  },
  before: app => {
  }
}
module.exports = devServer
