import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
// 要想显示children的页面，只能在父组件中定义<router-view />，是嵌套在父组件里面的。
// 给路由命名，可以在router-link中使用对象的方式来跳转
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'Vue里不好加meta信息，可以在这里进行SEO优化'
    },
    children: [
      {
        path: 'test',
        component: Login
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]
