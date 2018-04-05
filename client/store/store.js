// 所有store的入口
import Vuex from 'vuex'
// 初始化store
// 下面的方法不适用于服务端渲染，会内存溢出
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     // 修改store必须用mutations
//     updateCount (state, num) {
//       // 下面的方法就是修改上面的state中的count
//       state.count = num
//     }
//   }
// })

// export default store

// 为了适应服务端渲染，采用function的方法
export default () => {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      // 修改store必须用mutations
      updateCount (state, num) {
        // 下面的方法就是修改上面的state中的count
        state.count = num
      }
    }
  })
}
