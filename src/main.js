import 'babel-polyfill'
import 'common/js/rem.js'
import Vue from 'vue'
import App from './App'
import router from './router'

import './common/stylus/index.styl'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import vueRource from 'vue-resource'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(lazyload, {
  loading: 'static/loading/loading.png'
})
Vue.use(vueRource)

/* eslint-disable */
// 会引起警告
// Violation]为滚动阻止<some>事件添加了非被动事件侦听器。
import VConsole from 'vconsole'
var x = new VConsole()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
