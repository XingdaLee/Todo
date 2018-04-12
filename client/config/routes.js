// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app',
    props: true, // 如果props为true后，参数会作为一个组件的props参数传入Todo，不在需要通过this.$route来获取
    // 还可以自定义参数
    // props: {
    //   id: '343',
    //   card:'2323'
    // },
    // 直接在这拿组件中的this.$route对象进行函数的封装
    // props: (route) => ({
    //   id: route.query.b
    // }),
    // component: Todo, // 单个路由的配置

    // import依赖babel-plugin-syntax-dynamic-import包，否则会报错.安装好后需要在.babelrc中配置
    // import是对上面方法的优化，异步加载（异步路由），否则加载全部的组件，影响加载速度
    // 访问某一个组件时会加载当前组件编译后的js
    component: () => import('../views/todo/todo.vue'),
    name: 'app', // 给路由命名，可以在router-link中使用对象的方式来跳转
    meta: {
      title: 'this is app',
      description: 'Vue里不好加meta信息，可以在这里进行SEO优化'
    },
    // 路由跳转中增加钩子函数
    beforeEnter: (to, from, next) => {
      console.log('app beforeEnter') // 执行顺序在beforeEach后立即执行
      next() // 必加的参数
    }
    // 要想显示children的页面，只能在父组件中定义<router-view />，是嵌套在父组件里面的。
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
