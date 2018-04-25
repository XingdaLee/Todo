import Notification from './notification.vue'

export default {
  // 扩展notification模板
  extends: Notification,
  // 在这里声明style，返回新的内容就可以去覆盖notification.vue中的style。这就是extends去做的好处
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  data () {
    // 如果会用到的属性，提前声明一下
    return {
      verticalOffset: 0
    }
  }
}
