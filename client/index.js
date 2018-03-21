import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)
// 挂载页面
new Vue({
  render: (h) => h(App)
}).$mount(root)