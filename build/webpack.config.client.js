const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// 将css分离打包的方法
const ExtractPlugin = require('extract-text-webpack-plugin')
// 判断语法
const isDev = process.env.NODE_ENV === 'development'
// 设置host可以通过其他Ip可以访问到
// errors 把错误显示在网页上
// hot 热加载，只会渲染改动过的组件（需要设置HotModuleReplacementPlugin）
// NoEmitOnErrorsPlugin 隐藏不需要显示的信息
const devServerConfig = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true
}
// 如果不使用此插件，页面显示的只有目录结构。服务端渲染的时候不需要此插件
const defaultPlugin = [
  // 是给webpack编译过程中判断环境，可以在开发js中引用到当前环境变量
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
]

let config
if (isDev) {
  config = merge(baseConfig, {
    // 帮助我们在页面上调试代码，进行代码的映射，调试比较顺
    devtool: '#cheap-module-eval-source-map',
    devServer: devServerConfig,
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
              sourceMap: true,
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
} else {
  config = merge(baseConfig, {
    // 业务代码和框架代码的拆分
    // 拆分后可以充分的利用浏览器缓存框架代码，提高运行速度节省服务器流量
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    // chunkhash和hash的区别：hash是打包的时候，所有的js文件共用一个hash码，chunkhash则不会，不然每次打包浏览器缓存的框架代码就会被重新拉取
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    // postcss优化css，比如需要加css各个浏览器前缀
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
      }]
    },
    plugins: defaultPlugin.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      // 打包框架代码，放在runtime前面  
      // vendor和上面定义的vendor是一样的
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // 把webpack生成在app.js里的webpack代码单独放在一个文件里，使用这个方法，当有新模块添加时，会在末尾追加，不会影响到hash，影响长缓存
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])

  })
}

module.exports = config