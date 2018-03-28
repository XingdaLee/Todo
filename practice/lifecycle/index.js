import Vue from 'vue'
new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'aaa'
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  // 挂载html到dom上时执行,根据上面的输出结果可以得出：对dom的操作都放mounted里面
  // beforeMount和mounted在服务端渲染的时候是不会被调用的（服务端没有dom的环境，不会执行）
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  // 有数据更新的时候才会执行
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  // 执行app.$destroy()销毁组件时才会执行下面的周期函数(解除事件监听和watch)
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  renderError (h, err) {
    // 只关心自己的错误
    return h('div', {}, err.stack)
  },
  errorCaptured (h, err) {
    return h('div', {}, err.stack)
    // 和renderError的使用方法一样，区别在于如果在根组件定义，可以捕捉子组件的错误，会向上冒泡，可以在正式环境使用
  }
})
