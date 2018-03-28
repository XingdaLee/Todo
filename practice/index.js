import Vue from 'vue'
// const div = document.createElement('div')
// document.body.appendChild(div)
new Vue({
  // el: div,
  el: '#root', // 这里的root指的是build中template.html中的id为root的节点
  template: '<div>this is content</div>'
})
