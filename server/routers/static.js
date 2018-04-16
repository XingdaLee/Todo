// 这个文件用来处理生产环境打包后的资源文件的路径问题
const Router = require('koa-router')
const send = require('koa-send')

// 处理静态文件的中间件
const staticRouter = new Router({
  // 只会处理/ppublic开头的路径
  prefix: '/public'
})

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
