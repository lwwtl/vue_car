import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'
import './assets/css/global.css'
import axios from 'axios'
import './axios'
import './axios.js' // 请求拦截
import './permission.js' // 路由拦截
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios //
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
