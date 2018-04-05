<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{count}}</p>
    <p>{{fullName}}</p>
    <p>{{textPlus}}</p>
    <p>modules:{{textModules}}</p>
    <p>textC:{{textC}}</p>
    <!-- <todo></todo> -->
    <router-link to="/app/123">app</router-link>
    <!-- <router-link to="/app/456">app456</router-link> -->
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex' // vuex提供调用state和getter等的语法糖
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
// console.log(Header.__docs) // 双下划线，引用自定义的loader
export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    // 如果要查看类似于?a=222&b=333的参数，直接看打印的query（不需要定义）
    // console.log(this.$route)
    // 全局都可以使用 this.$store
    // console.log(this.$store)

    // 不使用mapMutations时的传统写法
    // let i = 1
    // // commit是触发mutations的语法
    // setInterval(() => {
    //   // 通过调用mutations里updateCount方法来修改count的值
    //   this.$store.commit('updateCount', i++)
    // }, 1000)

    // 使用mapMutations后
    // commit是触发mutations的语法
    // let i = 1
    // setInterval(() => {
    //   // 通过调用mutations里updateCount方法来修改count的值
    //   this.updateCount({
    //     num: i++,
    //     num2: 2
    //   })
    // }, 1000)

    // 不使用...mapActions传统的dispatch是触发anction的方法
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })

    // 使用...mapActions后
    // this.updateCountAsync({
    //   num: 5,
    //   time: 2000
    // })'
    // this.updateText('1234')
    this['a/updateText']('1234') // 模块中namespaced为true时的调用方法

    this['a/add']()

    this.testAction()
  },
  methods: {
    // mapActions和mapMutations是操作方法，所以写在这里
    ...mapActions(['updateCountAsync', 'a/add', 'testAction']),
    // ...mapMutations(['updateCount', 'updateText'])
    ...mapMutations(['updateCount', 'a/updateText']) // 模块中namespaced为true时的调用方法
  },
  // 获取store里count的数据
  computed: {
    // 模块化后调用方式1
    // textModules () {
    //   return this.$store.state.a.text
    // },
    // 模块化后调用方式2
    ...mapState({
      textModules: state => state.a.text,
      textC: state => state.c.text // store.registerModule动态加载模块的数据，在index.js
    }),
    // 语法糖的使用需要安装包babel-preset-stage-1 见readme
    // 语法糖写法代替下面的传统写法(第1种)
    // 页面调用的时候使用{{count}}
    ...mapState(['count']),

    // 语法糖写法代替下面的传统写法(第2种)
    // 上面调用的时候使用{{hello}}
    // ...mapState({
    //   hello: 'count'
    // }),

    // 语法糖写法代替下面的传统写法(第3种)
    // 上面调用的时候使用{{hello}}
    // function方式，需要计算的时候可以使用
    // ...mapState({
    //   hello: (state) => state.count
    // }),

    // 调用store里state的传统写法
    // count () {
    //   return this.$store.state.count
    // },

    // getter的语法糖使用方法
    // ...mapGetters(['fullName'])

    // ggetter的传统写法
    // fullName () {
    //   return this.$store.getters.fullName
    // }

    // 模块化后，有独立命名空间的getter的方法
    // 优点是结构化
    ...mapGetters({
      'fullName': 'fullName',
      'textPlus': 'a/textPlus'
    })
  }
}
</script>
// scoped 只在这个组件内生效
<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


