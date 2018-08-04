import Vue from 'vue'
import Router from 'vue-router'

let seller = () => import('../viewports/seller.vue')
let goods = () => import('../viewports/goods.vue')
let ratings = () => import('../viewports/ratings.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    }
  ]
})
