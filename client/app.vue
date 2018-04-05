<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!-- <todo></todo> -->
    <router-link to="/app/1234">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer></Footer>
    <router-view name="testRoute" />
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
// console.log(Header.__docs) // 双下划线，引用自定义的loader
export default {
  components: {
    Header,
    Footer,
    Todo
  },
  mounted () {
    // 如果要查看类似于?a=222&b=333的参数，直接看打印的query（不需要定义）
    console.log(this.$route)
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


