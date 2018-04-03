import Router from 'vue-router'
import routes from './routes'

// const router = new Router({
//   routes
// })

// export default router 不建议这么做，否则在全局其他地方引用的时候，都是同一个router对象

export default () => {
  return new Router({
    routes
  })
}
