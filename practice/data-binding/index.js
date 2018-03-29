import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    isActive: false,
    aaa: 124
  },
  // 双括号里只能访问this即vue对象上的数据和javascript的原生语法（白名单）
  // 要绑定变量使用v-bind或者直接使用冒号:id
  template: `
    <div v-bind:id="aaa">
      {{isActive}}
    </div>
  `
})
