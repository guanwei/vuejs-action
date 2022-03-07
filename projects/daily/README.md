使用npm初始化配置，会生成一个package.json文件
```
npm init
```

本地局部安装webpack，--save-dev会作为开发依赖来安装webpack
```
npm install webpack --save-dev
```

安装webpack-dev-server，他可以在开发环境中提供移动一个服务器，热更新，接口代理等服务
```
npm install webpack-dev-server --save-dev
```

在package.json的scripts里增加一个快速启动webpack-dev-server服务的脚本:
```
{
  // ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --config webpack.config.js"
  },
  // ...
}
```

其中--config是指向webpack-dev-server读取的配置文件路径，--open会在执行命令时自动在浏览器打开页面，默认地址是127.0.0.1:8080，IP和端口可以配置，比如：
```
"dev": "webpack-dev-server --host 192.168.1.101 --port 8888 --open --config webpack.config.js"
```

webpack配置中最重要也是必选的两项是入口（Entry）和出口（Output）

设置`static`路径为当前目录，才能读取到index.html文件
```
devServer: {
  static: './'
},
```

在webpack世界里，每个文件都是一个模块，对于不同的模块需要不同的加载器(Loader)来处理，比如css样式，就要用到style-loader和css-loader。下面通过NPM来安装它们：
```
npm install css-loader --save-dev
npm install style-loader --save-dev
```

webpack 5 使用mini-css-extract-plugin插件，会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

通过npm安装mini-css-extract-plugin插件
```
npm install mini-css-extract-plugin --save-dev
```

> **这里使用Vue2版本**

在webpack中使用vue-loader就可以对.vue格式的文件进行处理

使用.vue文件需要先安装vue-loader@15、vue-template-compiler等加载器并做配置。因为要使用ES6语法，还需要安装babel-loader等加载器，使用npm安装以下依赖：
```
npm install vue@2 --save
npm install vue-loader@15 vue-template-compiler --save-dev
npm install babel-loader @babel/core @babel/preset-env --save-dev
npm install @babel/plugin-transform-runtime --save-dev
```

箭头函数里的this指向与普通函数是不一样的，箭头函数内的this对象就是定义时所在的对象，而不是使用时所在的对象。

安装url-loader和file-loader来支持图片、字体等文件：
```
npm install url-loader file-loader --save-dev
```

打包会用到下面两个依赖，使用npm安装：
```
npm install webpack-merge html-webpack-plugin --save-dev
```

webpack-merge模块用于合并两个webpack的配置文件。
html-webpack-plugin用来生成html文件，通过template选项来读取指定的模板，然后输出到filename指定的目录。

知乎日报的接口地址前缀为http://news-at.zhihu.com/api/4，图片地址前缀为https://pic1.zhimg.com，由于两者开启了跨域限制，无法在前端直接调用，因此要开发一个代理。

我们基于Node.js的request库来做代理，通过npm安装request：
```
npm install request --save-dev
```

最后在终端使用Node启动代理服务：
```
node proxy.js
```

axios是基于Promise的HTTP库，同时支持前端和Node.js。首先用npm安装axios：
```
npm install axios --save
```