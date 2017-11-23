// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import init from './init/init'
init()
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import PopupRadio from './components/PopupRadio'
import xaddress from './components/xaddress'
import ipt from './components/ipt'
import vhtml from './components/vhtml.vue'
import arr from './components/array'
import renderw from './components/render-wrap'
import alert from './components/alert'

import './styles/index.scss' // 全局自定义的css样式
// debugger

// import r from './router/index'
Vue.use(VueRouter)
// console.log('r = ',r)
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/PopupRadio',
    component: PopupRadio
  },
  {
    path: '/xaddress',
    component: xaddress
  },
  {
    path: '/input',
    component: ipt
  },
  {
    path: '/vhtml',
    component: vhtml
  },
  {
    path: '/arr',
    component: arr
  },
  {
    path: '/render',
    component: renderw
  },
  {
    path: '/alert',
    component: alert
  }]

const router = new VueRouter({
  routes
})
// console.log('router = ', router)
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  // r,
  render: h => h(App)
}).$mount('#app-box')
