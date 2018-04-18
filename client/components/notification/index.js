import Notification from './notification.vue'
// 在使用vue.install的时候会接收Vue参数，然后可以将Notification在全局注册，都可以使用到
export default (Vue) => {
  Vue.component(Notification.name, Notification)
}
