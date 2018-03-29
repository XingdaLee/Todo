import Vue from 'vue'
new Vue({
  el: '#root',
  data: {
    firstName: 'Sinder',
    lastName: 'Lee'
  },
  template: `
    <div>
      <span>Name: {{name}}</span>
    </div>
  `,
  // 如果computed中的依赖的变量，有变化的时候才会重新计算。没有变化就是缓存
  // 尽量不在这里进行数据的修改，只做生成新的值
  computed: {
    name () {
      return `${this.firstName} ${this.lastName}`
    }
  },
  // watch高级用法
  watch: {
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true, // 立即执行监听，否则只有当值变化的时候才会开始监听
      deep: true // 深度监听，能监听到当obj的key的val发生变化的时候（需要监听obj改变内部属性时）
    }
  }
  // 另一种用法
  // computed: {
  //   name: {
  //     get() {

  //     },
  //     set() {

  //     }
  //   }
  // }
})
