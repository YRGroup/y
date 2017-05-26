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
        Vue.prototype.$API = serverAPI
        break;
    case 'node':
        Vue.prototype.$API = nodeAPI
        break;
    case 'static':
        Vue.prototype.$API = staticAPI
        break;
    case 'Bmob':
        Vue.prototype.$API = BmobAPI
        break;
    default :
        Vue.prototype.$API = serverAPI
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