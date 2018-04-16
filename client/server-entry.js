// import { createApp } from './create-app'
import createApp from './create-app' // 默认就是function，不需要加{}

// 返回一个function 参数就是
// 这边接收了一个context就等于server-render.js的renderer.renderToString(context)方法传入了一个context
// 所以可以给context赋很多的值，自己想赋值都可以，在vue的渲染的过程中，vue也会给它赋很多的值
export default context => {
  // 必须返回一个Promise对象，可能会做一些异步的操作，要让vue-server-renderer知道我们异步的操作什么时候结束了
  return new Promise((resolve, reject) => {
    // 每次都要创建，如果写在外面只会创建一次
    // const {app, router, store} = createApp() // store还没用到，先去掉
    const {app, router} = createApp()
    // 给路由推一条记录，给匹配到要调用的组件
    router.push(context.url)
    // 在路由记录被推进去后
    router.onReady(() => {
      // 只会在服务端渲染用到。因为每个url显示的组件是不一样的，所以要根据url匹配到组件后在去做一些操作
      const matchedComponents = router.getMatchedComponents()
      // 因为还目前我们没有异步的请求，先简单的判断一下
      if (!matchedComponents.length) {
        return reject(new Error('no Component matched'))
      }
      // 服务端渲染中vue-meta的用法
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
