// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'

FastClick.attach(document.body)

Vue.config.productionTip = false


// import myAPI from './server/API'
// Vue.prototype.$API = myAPI

// 多API切换
import nodeAPI from './server/nodeAPI'
Vue.prototype.$nodeAPI = nodeAPI

import serverAPI from './server/serverAPI'
Vue.prototype.$serverAPI = serverAPI

import staticAPI from './server/staticAPI'
Vue.prototype.$staticAPI = staticAPI

import BmobAPI from './server/BmobAPI'
Vue.prototype.$BmobAPI = BmobAPI

switch(store.state.APItype){
    case 'server':
        console.log('使用win-server API')
        Vue.prototype.$API = serverAPI
        console.log(Vue.prototype.$API)
        break;
    case 'node':
        console.log('使用node.js API')
        Vue.prototype.$API = nodeAPI
        console.log(Vue.prototype.$API)
        break;
    case 'static':
        console.log('使用本地静态API')
        Vue.prototype.$API = staticAPI
        console.log(Vue.prototype.$API)
        break;
    case 'Bmob':
        console.log('使用Bmob云端API')
        Vue.prototype.$API = BmobAPI
        console.log(Vue.prototype.$API)
        break;
    default :
        console.log('未指定API，默认使用win-server API')
        Vue.prototype.$API = serverAPI
        console.log(Vue.prototype.$API)
        break;
}

import axios from 'axios'
Vue.prototype.$http = axios

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import Icon from 'vue-svg-icon/Icon.vue'
Vue.component('icon', Icon)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')