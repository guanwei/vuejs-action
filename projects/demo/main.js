// import './style.css'
// document.getElementById('app').innerHTML = 'Hello Webpack.'

// 导入Vue框架
import Vue from 'vue'
// 导入app.vue组件
import App from './app.vue'

// 创建Vue根实例
new Vue({
  el: '#app',
  render: h => h(App)
})