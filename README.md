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

``

--ext .js 指定检查的文件类型

最后的参数client/ 指定文件夹

--fix: 执行后会自动修复错误！！（牛逼）
``

### packages

webpack-merge 用来帮助扩展webpack配置文件（业务拆分,合并webpack配置）

rimraf 每次打包前删除dist目录

eslint全家桶： npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslin t-plugin-node eslint-plugin-html -D

``

eslint-plugin-html: 识别vue文件里的javascript的插件
``

eslint-loader: 在开发过程中直接使用eslint进行检查

babel-eslint: babel编译后的语法可能对eslint支持的不太友好，使用它来解决这个问题，需要在.eslintrc中设置parser

husky: 安装后会自动在本地git中生成一个hooks,每次命令行中执行 git commit 时，它会自动读取本地的package.json中的precommit并执行相应的脚本（强制规范代码的风格协调）
