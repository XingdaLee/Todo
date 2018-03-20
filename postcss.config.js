// 优化css，比如需要加css各个浏览器前缀
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer()
  ]
}