const Koa = require('koa')

const app = new Koa()

// 服务端渲染分开发和正式环境
const isDev = process.env.NODE_ENV === 'development'

// Koa中间件来记录服务端的请求，抓取一些错误
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      // 往页面的body中写入错误信息
      ctx.body = err.message
    } else {
      ctx.body = "please try again later"
    }
  }
})
