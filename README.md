# 使用方法

进入项目目录，运行

``
npm install
``
然后执行
``
npm run dev
``

## 笔记

### webpack

cross-env 包是用于设置环境变量使用

"lint": "eslint --ext .js --ext .jsx --ext .vue client/"

"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/"

```js

--ext .js 指定检查的文件类型

最后的参数client/ 指定文件夹

--fix: 执行后会自动修复错误！！（牛逼）
```

### packages

webpack-merge 用来帮助扩展webpack配置文件（业务拆分,合并webpack配置）

rimraf 每次打包前删除dist目录

eslint全家桶： npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslin t-plugin-node eslint-plugin-html -D

```js

eslint-plugin-html: 识别vue文件里的javascript的插件
```

eslint-loader: 在开发过程中直接使用eslint进行检查

babel-eslint: babel编译后的语法可能对eslint支持的不太友好，使用它来解决这个问题，需要在.eslintrc中设置parser

husky: 安装后会自动在本地git中生成一个hooks,每次命令行中执行 git commit 时，它会自动读取本地的package.json中的precommit并执行相应的脚本（强制规范代码的风格协调）

### webpack4相关(单独分支)

卸载老版本的webpack配置: npm uninstall webpack webpack-dev-server webpack-merge -D

安装新的webpack配置: npm install webpack webpack-dev-server webpack-merge webpack-cli -D

```
webpack-cli: webpack4之后，在命令行启动的脚本都在cli里,不然装了webpack不能在命令行中使用

安装最新版本的webpack后，会提示很多其他的模块依赖的是2或者3版本，需要升级，只需要把这些模块卸载掉，重新安装即可

npm uninstall babel-loader extract-text-webpack-plugin file-loader html-webpack-plugin -D

重新安装后，发现个别模块还是需要依赖2或者3版本的webpack，可以尝试下面的操作，如：

npm i extract-text-webpack-plugin@next -D

@next指的是还没发布的下一个版本，属于测试版本

运行 npm run dev 后显示 stylus和vue的loader版本不对，进行升级：

npm i stylus-loader@3.0.2 vue-loader@14.1.1 -D

```

