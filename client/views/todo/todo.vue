<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
    <!-- <router-view /> -->
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  metaInfo: {
    title: 'The todo App'
  },
  // 这里的所有路由钩子函数是不能直接拿到this的，需要在vm里使用
  // 路由进入的时候
  beforeRouteEnter: (to, from, next) => {
    console.log('to do beforeRoute-Enter')
    next(vm => {
      console.log('this 就是 vm，id为：' + vm.id)
    })
  },
  // update的触发条件是：当访问同一个路由，使用的是不同的url参数时
  // 使用场景，比如根据不用的id获取不同的参数时候，可以节省使用watch的开销
  beforeRouteUpdate: (to, from, next) => {
    console.log('to do beforeRoute-Update')
    next()
  },
  // 路由离开的时候
  // 应用场景：比如用户在填写一个重大表单，点击离开的时候可以提醒
  beforeRouteLeave: (to, from, next) => {
    // if (global.confirm('are you sure ?')) {
    //   next()
    // }
    console.log('to do beforeRoute-Leave')
    next()
  },
  props: ['id'], // 这个id是通过routes.js中props为true时传入
  // 在使用router后，对于访问url，同一个组件使用的不同参数，mounted只会触发一次，所以不能在这里进行根据不同的id获取不同的数据
  mounted () {
    console.log(this.id)
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>


