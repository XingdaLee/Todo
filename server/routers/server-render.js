// 服务端渲染的配置
// 用ejs渲染template
const ejs = require('ejs')
// ctx:把返回的html写到ctx的body里面
// renderer:开发和正式的render流程不一样，需要外部传入，template也是一样的，需要外部传入
 module.exports = async(ctx, renderer, template) => {
  ctx.header['contentType'] = 'text/html'
  // context传入vue-renderer中去，渲染完成后插入一堆属性，帮助我们渲染html，包括客户端的js、css路径，包括每个vue文件中的style
  // 还有用到的title等都可以通过context拿出来
  const context = { url: ctx.path }

  try {
    // 这个方法返回的是Promise可以用await来调用
    const appString = await renderer.renderToString(context)
    // 渲染html，{}中是渲染template需要用到的变量
    // appString、style和scripts等需要在server.template.ejs模板中定义
    const html = ejs.render(template, {
      appString: appString,
      style: context.renderStyles(), // 可以拿到带有style标签的整个字符串，不在需要自己写标签
      scripts: context.renderScripts() // 可以拿到带有script标签的整个字符串
    })
    // 返回给客户端完整的html页面
    ctx.body = html
  } catch (error) {
    console.log('render error',error)
    throw error
  }
 }
