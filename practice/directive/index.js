import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      {{text}}
    </div>
  `,
  data: {
    text: 0,
    active: false
  }
})
// 参考vue文档即可，不需要写代码
// v-text
// v-html
// v-show
// v-if
// v-else
// v-else-if
// v-for
// v-on
// v-bind
// v-model
// v-pre
// v-cloak
// v-once
