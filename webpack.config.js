const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 将css分离打包的方法
const ExtractPlugin = require('extract-text-webpack-plugin')
// 判断语法
const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 编译目标是web平台
  target: 'web',
  //entry 入口
  // __dirname代表当前根目录，下面语法是拼接完整路径
  entry: path.join(__dirname, 'src/index.js'),
  // 输出
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  // 添加其他的处理方法
  // test 表示使用该文件类型（相当于正则）
  // loader 是处理的方法
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            // options是当前loader的配置
            // url-loader将图片转化为base64
            // limit如果图片小于1024转化为base64
            // name 输出的文件名字，ext是后缀名
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 是给webpack编译过程中判断环境，可以在开发js中引用到当前环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    // use是执行多个操作时才会使用，执行方式是从下向上，一层一层的嵌套使用，达到自己想要的结果
    // 比如：stylus-loader编译成css给css-loader处理，css-loader处理完在给style-loader处理
    // style-loader会把css代码加到bundle.js中去
    use: [
      'style-loader',
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
  // 帮助我们在页面上调试代码，进行代码的映射，调试比较顺
  config.devtool = '#cheap-module-eval-source-map'
  // 设置host可以通过其他Ip可以访问到
  // errors 把错误显示在网页上
  // hot 热加载，只会渲染改动过的组件（需要设置HotModuleReplacementPlugin）
  // NoEmitOnErrorsPlugin 隐藏不需要显示的信息
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // 业务代码和框架代码的拆分
  // 拆分后可以充分的利用浏览器缓存框架代码，提高运行速度节省服务器流量
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  // chunkhash和hash的区别：hash是打包的时候，所有的js文件共用一个hash码，chunkhash则不会，不然每次打包浏览器缓存的框架代码就会被重新拉取
  config.output.filename = '[name].[chunkhash:8].js'
  // postcss优化css，比如需要加css各个浏览器前缀
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
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
  )
  // vendor和上面定义的vendor是一样的
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    // 打包框架代码，放在runtime前面
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 把webpack生成在app.js里的webpack代码单独放在一个文件里，使用这个方法，当有新模块添加时，会在末尾追加，不会影响到hash，影响长缓存
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config
