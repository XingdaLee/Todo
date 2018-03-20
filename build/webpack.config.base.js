// 不同的webpack的配置文件中，共用的部分（开发、生产、服务端等都依赖这个配置）
const path = require('path')
const config = {
  // 编译目标是web平台
  target: 'web',
  //entry 入口
  // __dirname代表当前根目录，下面语法是拼接完整路径
  entry: path.join(__dirname, '../client/index.js'),
  // 输出
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  // 添加其他的处理方法
  // test 表示使用该文件类型（相当于正则）
  // loader 是处理的方法
  // exclude忽略掉，不编译
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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            // options是当前loader的配置
            // url-loader将图片转化为base64
            // limit如果图片小于1024转化为base64
            // name 输出的文件名字，ext是后缀名
            // 中括号中的变量都是url-loader中的变量 
            // hash:8 表示只要8位字符长度，ext是原本的扩展名
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
