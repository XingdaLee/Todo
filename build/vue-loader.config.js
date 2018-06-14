// const docsLoader = require.resolve('./doc-loader')
// 使用function根据环境变量加载不同的配置
module.exports = (isDev) => {
  return {
    preserveWhitespace: true, // 检查vue阻止元素间生成空格
    extractCSS: !isDev, // vue默认是不会把vue文件中的css单独打包到一个文件中，设置为true即可
    // extractCss: isDev // vue默认是不会把vue文件中的css单独打包到一个文件中，设置为true即可
    // cssModules的使用方法可以百度（主要用于clss名称加密等）
    cssModules: {
      // 使用cssmodules后，每个vue的className都会根据下面的path等参数生成独立的文件
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelcase: true // 规定css使用驼峰形式抒写
    }
    // hotReload: false // 热重载，自动根据环境变量生成，不需要设置
    // loaders: {
    //   // 自定义loader，书写类似于vue中template、style的模块
    //   "docs": docsLoader
    // }
    // preLoader: {
    //   // 是webpack提供的底层调用方法，比如typescript语法，这里定义后，先用loader解析，在用上面的loaders解析，最先执行
    // }
  }
}
