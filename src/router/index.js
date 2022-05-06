import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'theme',
    component: () => import('@/views/theme.vue')
  },
  {
    // 会匹配所有路径
    // 含有通配符的路由应该放在最后
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
