// 重新封装数据的一个过程
// 这里定义的方法可以在vue组件中使用了
export default {
  fullName (state) {
    return `${state.firstName} ${state.lastName}`
  }
}
