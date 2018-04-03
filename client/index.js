import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import './assets/styles/global.styl'
import createRouter from './config/router'

// const root = document.createElement('div')
// document.body.appendChild(root)
// 挂载页面
// new Vue({
//   render: (h) => h(App)
// }).$mount(root)

const router = createRouter()
// 挂载vue-router
Vue.use(VueRouter)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
