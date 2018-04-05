<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{count}}</p>
    <p>{{fullName}}</p>
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
import {mapState, mapGetters} from 'vuex' // vuex提供调用state和getter的语法糖
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
    let i = 1
    setInterval(() => {
      // 通过调用mutations里updateCount方法来修改count的值
      this.$store.commit('updateCount', i++)
    }, 1000)
  },
  // 获取store里count的数据
  computed: {
    // 语法糖的使用需要安装包babel-preset-stage-1 见readme

    // 语法糖写法代替下面的传统写法(第1种)
    // 调用的时候使用{{count}}
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

    // get的语法糖使用方法
    ...mapGetters(['fullName'])

    // get的传统写法
    // fullName () {
    //   return this.$store.getters.fullName
    // }
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


