// 生产环境的服务端渲染方法
const path = require('path')
const Router = require('koa-router')
const VueServerRender = require('vue-server-renderer')
const serverRender = require('./server-render')
const fs = require('fs')
// 有了这个就可以去创建render，node中这样获取json后会转为对象
const clientManifest = require('../../public/vue-ssr-client-manifest.json')
// 第一个参数是服务端渲染的json
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  // 第二个参数是配置
  {
    inject: false,
    clientManifest
  }
)
const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const pageRouter = new Router()

pageRouter.get('*', async (ctx) => {
  // 执行
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter
