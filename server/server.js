const Koa = require('koa')
const app = new Koa()
const send = require('koa-send')
const path = require('path')
// 服务端渲染分开发和正式环境
const isDev = process.env.NODE_ENV === 'development'
const staticRouter = require('./routers/static')
// 中间件
// 因为是异步的，所以使用await
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    // 发送内容和文件的路径，第三个参数是文件的查找的目录
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

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
      ctx.body = 'please try again later'
    }
  }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}
// koa的router的用法
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
