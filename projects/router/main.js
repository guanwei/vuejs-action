import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

Vue.use(VueRouter)

// 路由配置
const Routes = [
  {
    path: '/index',
    meta: {
      title: '首页'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
  },
  {
    path: '/about',
    meta: {
      title: '关于'
    },
    component: (resolve) => require(['./views/about.vue'], resolve)
  },
  {
    path: '/user/:id',
    meta: {
      title: '个人主页'
    },
    component: (resolve) => require(['./views/user.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/index'
  }
]

const RouterConfig = {
  // 使用 HTML5 的 History 路由模式
  mode: 'history',
  routes: Routes
}
const router = new VueRouter(RouterConfig)
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
// 校验是否登录
// router.beforeEach((to, from, next) => {
//   if (window.localStorage.getItem('token')) {
//     next()
//   } else {
//     next('/login')
//   }
// })
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

// 创建Vue根实例
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
