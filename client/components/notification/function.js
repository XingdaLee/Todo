// import Vue from 'vue'
// import Component from './func-notification'

// // 创建一个组件
// const NotificationConstructor = Vue.extend(Component)

// // 保存已经生成的notification列表
// const instances = []

// // 用来生成整个组件的id，比如删除组件的时候做个判断
// let seed = 1

// // 声明方法接收一个options，比如我们穿content和btn的时候，都是通过options传进来
// const notify = (options) => {
//   // 如果是服务端运行，就return，因为服务端没有dom环境
//   if (Vue.prototype.$isServer) {
//     return
//   }

//   const instance = new NotificationConstructor({})
//   const id = `notification_${seed++}`
//   instance.id = id
//   // 不传节点的时候，只是生成了$el的对象，还没真正的插入dom里面去，节点已经生成好。div标签已经有了
//   instance.$mount()
//   // 放到body下面
//   document.body.appendChild(instance.vm.$el)
//   // 计算高度,默认把notification全部放在右下角，如果出现新的，第一个就会往上顶
//   let verticalOffset = 0
// }
