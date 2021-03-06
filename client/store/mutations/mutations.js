export default {
  // 修改store必须用mutations
  // 类似updateCount中的形参不是随便传的,只能传两个(例如updateCount中的state, num),
  // 第二个num，如果是一个字符串或者数字可以穿，当需要传多个时要把num参数封装成object
  updateCount (state, {num, num2}) {
    // 下面的方法就是修改上面的state中的count
    state.count = num
  }
  // 接受多个参数,假设obj:{a:1,b:2}传入到updateCount，那么写法如下
  // updateCount (state, {a, b}) {
  //   // 下面的方法就是修改上面的state中的count
  //   state.count = num
  // }
}
