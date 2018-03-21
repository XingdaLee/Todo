// 使用function根据环境变量加载不同的配置
module.exports = (isDev) => {
  return {
    preserveWhitespace: true, // 检查vue阻止元素间生成空格
    extractCss: true // vue默认是不会把vue文件中的css单独打包到一个文件中，设置为true即可
    // extractCss: isDev // vue默认是不会把vue文件中的css单独打包到一个文件中，设置为true即可
    // cssModules: {},
    // hotReload: true // 热重载
  }
}