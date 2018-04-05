import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
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
    // component: Todo, //单个路由的配置
    components: {
      // 双route-view的配置
      default: Todo,
      testRoute: Login
    },
    name: 'app', // 给路由命名，可以在router-link中使用对象的方式来跳转
    meta: {
      title: 'this is app',
      description: 'Vue里不好加meta信息，可以在这里进行SEO优化'
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
    component: Login
  }
]
