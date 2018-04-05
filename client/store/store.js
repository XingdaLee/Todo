// 所有store的入口
import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
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
const isDev = process.env.NODE_ENV === 'development'
// 为了适应服务端渲染，采用function的方法
export default () => {
  return new Vuex.Store({
    // strict为true时禁止直接通过this.$store.state.count = 2这样的方式给state赋值
    // 这么做是因为vuex官方推荐，也是为了规范，改state只能通过mutations来操作(例如this.$store.commit('updateCount', i++))
    // 生产环境需要设置为false
    strict: isDev,
    state: defaultState,
    mutations: mutations,
    getters: getters,
    actions: actions
  })
}
