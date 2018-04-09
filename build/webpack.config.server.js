// 服务端渲染(服务端不需要代码压缩等，只需要跑起来即可)
// webpack.config.practic是Demo环境需要的配置
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// 将css分离打包的方法
const ExtractPlugin = require('extract-text-webpack-plugin')
// vue的服务端渲染最重要的一个插件
// 这个插件会生成一个单独的json文件，帮助我们在服务端渲染里面处理很多复杂的逻辑
// 正式跑代码的时候也要用到，所以安装到dependencies目录下
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config
config = merge(baseConfig, {
  // 必填，指定目标为node环境不是浏览器环境，webpack的配置项
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  // server render会有个webpack的插件，提供代码调试的功能，指引到出错的文件
  devtool: 'source-map',
  // 因为是服务端跑的，所以要配置此项，指定写的代码入口是什么样的
  // 类型是commonjs2，node中模块化，可以直接使用module.exports
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js', // 不要有hash，是通过模块加载，不需要像浏览器那样的缓存
    path: path.join(__dirname, '../server-build') // 配置输出目录
  },
  // 打包的时候不要package.json中的dependencies，防止打包两份，造成内存溢出等
  // 一般情况下webpack会把我们需要的插件全部打包到一个js文件中，包括依赖的文件。然后给浏览器使用
  // 但是，在node环境下，我们可以直接import或者require到node_modules中的文件，如果在打包的话，
  // 会有两套vue相关的代码，所以使用externals给忽略掉
  externals: Object.keys(require('../package.json').dependencies),
  // styl文件要单独打包到一个css文件中，因为style-loader会把css代码加到bundle.js中去，会有dom的操作，
  // 但是node没有dom的执行环境，会引起报错
  module: {
    rules: [{
      test: /\.styl/,
      use: ExtractPlugin.extract({
        // fallback: 'style-loader',
        fallback: 'vue-style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      })
    }

    ]
  },
  plugins: [
    // 声明css代码分离的插件，并设置代码的hash
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"' // vue服务端渲染官方建议这么做，可能在vue中会遇到这个属性

    }),
    // 直接new就可以了，整体打包不会有javascript输出，输出的是json文件
    // 这个json文件可以通过vue-server-renderer这个包做很多服务端渲染的内容，帮复杂的逻辑包含在里面
    new VueServerPlugin()
  ]
})

module.exports = config
