// 每一次服务端渲染，都要渲染一个新的app，不能用上次渲染过的app对象再次继续下一个渲染。因为这个app已经包含
// 上次渲染的状态，会影响我们下一次渲染的内容，所以每次都要去给它创建一个新的app
// 和index.js差不多，初始化的内容都放这里做
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'
// 应用的入口
import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'

import './assets/styles/global.styl'
// 自定义组件
import Notification from './components/notification'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
// use后可以全局使用
Vue.use(Notification)
// 返回一个方法,每次调用这个方法都会返回一个新的Vue、createRouter对象等等
// 每一次都必须创建一个新的app，不然会导致应用在node端造成内存溢出的情况
export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router: router,
    store: store,
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  }
}
