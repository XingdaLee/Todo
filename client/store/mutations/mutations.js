export default {
  // 修改store必须用mutations
  updateCount (state, num) {
    // 下面的方法就是修改上面的state中的count
    state.count = num
  }
}
