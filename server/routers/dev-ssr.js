// 开发环境的处理
const Router = require('koa-router')
const axios = require('axios')
const fs = require('fs')
// MemoryFS的特性：API和node的fs一样，区别在于生成的文件不会写在硬盘上，而是在内存里读取，可以提高效率
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
// 导入webpack的server的配置
const serverConfig = require('../../build/webpack.config.server')
const path = require('path')
const serverRender = require('./server-render')
// 在node环境中编译webpack
// 通过webpack直接调用，serverCompiler可以直接在nodejs中去run或者watch得到一个在服务端渲染需要用到的bundle
const serverCompiler =  webpack(serverConfig)
const mfs = new MemoryFS()
// 指定Compiler的输出目录是在MemoryFS里面
serverCompiler.outputFileSystem = mfs
// 记录webpack每次打包生成的新的文件
let bundle
// 和devServer一样，在client中改了某一个文件，node都会调用webpack执行重新打包,就可以拿到新的文件
// 第一个参数是空对象，可以不用管,第二个参数是回调函数
serverCompiler.watch({}, (err, stats) => {
  // 处理错误信息,如果出现错误，直接抛出
  if (err) throw err
  // stats里的错误只要不是打包的错误，比如eslint的错误都会在stats中，不会出现在err中
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  // 错误信息处理完后，处理生成的bundle文件
  const bundlePath = path.join(
    serverConfig.output.path, // 输出的文件路径
    'vue-ssr-server-bundle.json' // 自定义文件名,以为我们使用了VueServerPlugin插件,所以输出的文件名是json
  )
  // 指定字符集编码否则输出的是二进制文件，返回的是字符串所以要封装成json
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})
// koa的中间件，用来处理整个服务端渲染返回的东西，只需要在ctx.body上指定我们要返回的html
const handleSSR = async (ctx) => {
  // bundle不存在的情况，比如第一次启动的时候，webpack打包比较慢，直接在浏览器访问肯定会报错
  if (!bundle) {
    ctx.body = "bundle文件还未生成,请稍等....."
    return
  }
  // 需要获取客户端也就是dev-server中的帮我打包出来的javascript代码，拿到这个js的路径后
  // 才能进行html的拼接，这样返回给浏览器的时候才能渲染，不然只是一个空的html
  // 不能同时起两个server，不能通过node代码用一个进程去获取另一个进程里的数据，可以通过axios发送请求去dev-server拿数据
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  // clientManifestResp是个response对象，需要从data中拿到数据
  const clientManifest = clientManifestResp.data
  // 如果有bundle了,开始服务端渲染的过程,现在生成的文件没有html的头和标签，需要听歌ejs的模板进行组装后渲染
  // 1.先通过fs把模板读进来
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),'utf-8'
  )
  // 2.声明一个render.
  // createBundleRenderer可以帮我们创建一个我们可以直接调用render的一个function
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    // 为什么是false，防止它进行注入的操作
    // VueServerRenderer可以指定一个template，
    // 但是这个template一定要按照VueServerRenderer官方的文档去写，会自动的把我需要的内容插入进去
    // 但是限制会比较大，会导致部分功能没办法做。所以不需要VueServerRenderer去做。只需要它把app渲染出来，剩下的外卖自己处理
    inject: false,
    clientManifest // 传入后会自动生成一个带script标签的js文件引用的字符串给填写到ejs里
  })
  await serverRender(ctx, renderer, template)
}

const router = new Router()
// 所有的请求都通过handleSSR处理
router.get('*', handleSSR)

module.exports = router
