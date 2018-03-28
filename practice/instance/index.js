import Vue from 'vue'
const app = new Vue({
  // el: '#root', // 页面挂载到什么地方（过程是替换掉）。这里的root指的是build中template.html中的id为root的节点
  template: '<div>this is {{text}} {{obj.a}}</div>',
  // 细节:如果data里的text不在这里声明，并且直接在外面赋值。vue是不会主动渲染的（响应式）,可以调用forceUpdate来强制渲染
  data: {
    text: 0,
    obj: {}
  }
})
app.$mount('#root') // 另一种挂载html节点的方式

setInterval(() => {
  app.text += 1
  app.$set(app.obj, 'a', 'haha') // 主动给data的属性赋值,a代表obj对象中的key
  // app.$data.text += 1 //这个方式其实和app.text使用的是同一个对象,app.text是它的代理
}, 1000)

// vue的数据
// console.log(app.$data)

// 传参
// console.log(app.$props)

// HTML节点
// console.log(app.$el)

// vue初始化和我们自行添加的所有属性
// console.log(app.$options)

// 调用主动渲染可以改变当前页面
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// vue的对象， app.$root === app,在所有的节点中都可以调用
// console.log(app.$root)

// 处理组件中的父子关系
// console.log(app.$children)

// 插槽
// console.log(app.$slots)
// console.log(app.$scopedSlots)

// 对模板的引用
// console.log(app.$refs)

// 在服务端渲染的时候才会用到
// console.log(app.$isServer)

// 监听
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unWatch() // 再次调用就是注销watch
// }, 2000)

// 事件的监听和触发(必须在同一个vue对象上才能使用) $one一直监听,$once只监听一次
// app.$on('test', (val1, val2) => {
//   console.log(`test emited:${val1} and ${val2}`)
// })
// app.$emit('test', 1, 2)

// 强制组件重新渲染，性能开销大
// app.$forceUpdate()
