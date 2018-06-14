// webpack.config.practic是Demo环境需要的配置
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// 判断语法
// 设置host可以通过其他Ip可以访问到
// errors 把错误显示在网页上
// hot 热加载，只会渲染改动过的组件（需要设置HotModuleReplacementPlugin）
// NoEmitOnErrorsPlugin 隐藏不需要显示的信息
const devServerConfig = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}
// 如果不使用此插件，页面显示的只有目录结构。服务端渲染的时候不需要此插件
const defaultPlugin = [
  // 是给webpack编译过程中判断环境，可以在开发js中引用到当前环境变量
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

let config
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  // 帮助我们在页面上调试代码，进行代码的映射，调试比较顺
  devtool: '#cheap-module-eval-source-map',
  devServer: devServerConfig,
  // 这里指定项目的vue的版本，如 import Vue from 'vue'的操作
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  module: {
    rules: [{
      test: /\.styl/,
      // use是执行多个操作时才会使用，执行方式是从下向上，一层一层的嵌套使用，达到自己想要的结果
      // 比如：stylus-loader编译成css给css-loader处理，css-loader处理完在给style-loader处理
      // style-loader会把css代码加到bundle.js中去
      use: [
        'vue-style-loader',
        'css-loader',
        // css modules的用法
        // {
        //   loader: 'css-loader',
        //   options: {
        //     module: true,
        //     localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
        //   }
        // },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }]
  },
  plugins: defaultPlugin.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
