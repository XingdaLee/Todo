const Koa = require('koa')
const app = new Koa()
// 服务端渲染分开发和正式环境
const isDev = process.env.NODE_ENV === 'development'
const pageRouter = require('./routers/dev-ssr')
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
// koa的router的用法
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
