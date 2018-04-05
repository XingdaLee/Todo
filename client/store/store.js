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
  const storeHot = new Vuex.Store({
    // strict为true时禁止直接通过this.$store.state.count = 2这样的方式给state赋值
    // 这么做是因为vuex官方推荐，也是为了规范，改state只能通过mutations来操作(例如this.$store.commit('updateCount', i++))
    // 生产环境需要设置为false
    strict: isDev,
    state: defaultState,
    mutations: mutations,
    getters: getters,
    actions: actions,
    // 模块化，每个模块都是单独的作用域
    // state的调用方式:
    // ...mapState({
    //   textModules: state => state.a.text
    // }),
    // 模块下还可以在增加模块，是无限延伸的
    modules: {
      a: {
        // 设置了命名空间后，mutations里的变量名可以重复，但是调用方式必须改为:
        //  ...mapMutations(['updateCount', 'a/updateText'])
        // this['a/updateText']('1234')
        // 详情看app.vue
        namespaced: true,
        state: {
          text: 1
        },
        // 这里的mutations只限于当前模块作用域
        mutations: {
          updateText (state, text) {
            console.log('modules-a-mutations:', state)
            state.text = text
          }
        },
        getters: {
          // state: 当前的state
          // getters: 所有的getters方法
          // rootState: 全局的state
          textPlus (state, getters, rootState) {
            return state.text + rootState.b.text
          }
        },
        actions: {
          // 下面必须调用全局的情况下，是在namespaced为true的前提下
          // 不加root:true的情况下，默认commit的是当前模块（a）里的mutations
          // 如果root:true 就是从全局找
          add ({state, commit, rootState}) {
            // commit('updateText', rootState.count)
            commit('updateCount', {num: 56789}, {root: true}) // 模块内部调用全局的mutations
          }
        }
      },
      b: {
        state: {
          text: 2
        },
        actions: {
          testAction ({commit}) {
            commit('a/updateText', '我是b中的actions调用的', {root: true})
          }
        }
      }
    }
  })
  // webpack热更替的普遍代码，目的是防止每次更新store时页面会闪烁刷新
  // 官方api的支持
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => { // 开启热更新
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default
      storeHot.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return storeHot
}
