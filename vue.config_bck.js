const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'
const isDev = process.env.NODE_ENV !== 'production'
console.log('这里是 TARGET_NODE 的结果-------------', TARGET_NODE,target)
console.log('这里是 isDev 的结果-------------', isDev)
module.exports = {
  publicPath: isDev ? 'http://127.0.0.1:8080' : '',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  css: {
    extract: false
  },
  configureWebpack: () => ({
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${target}.js`,
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: TARGET_NODE
      ? nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: [/\.css$/]
      })
      : undefined,
    optimization: {
      splitChunks: undefined
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: "async",
    //     minSize: 30000,
    //     minChunks: 2,
    //     maxAsyncRequests: 5,
    //     maxInitialRequests: 3
    //     // name: true,
    //     // cacheGroups: {
    //     //   default: {
    //     //     minChunks: 1,
    //     //     priority: -20,
    //     //     reuseExistingChunk: true,
    //     //   },
    //     //   vendors: {
    //     //     test: /[\\/]node_modules[\\/]/,
    //     //     priority: -10
    //     //   }
    //     // }
    //   }
    // },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        })
      })
  }
}
