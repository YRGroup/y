// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import _ from 'lodash'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import API from './server/API'
import md5 from 'js-md5'
import axios from 'axios'
import VuePreview from 'wxpreview'


// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条 样式

import {
  LoadingPlugin,
  ToastPlugin,
  ConfirmPlugin
} from 'vux'
Vue.use(VuePreview)

FastClick.attach(document.body)

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })
  if (!to.matched.some(record => record.meta.anonymous) && !localStorage.getItem("hasLogin")) {
    router.push('/login')
    return
  }
  if (!to.matched.some(record => record.meta.anonymous)) {
    API.refreshLiveness()
  }
  next()
})
// 改变loading状态
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
})

// 日期格式化
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Vue.prototype.$API = API

axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  // store.commit('updateLoadingStatus', {isLoading: true})
  let now = new Date().getTime()
  let token = localStorage.token
  let sigh = md5(token + now)
  config.headers.time = now
  config.headers.sign = sigh
  return config
}, err => {
  return Promise.reject(err)
});
axios.interceptors.response.use(
  response => {
    // if(process.env.NODE_ENV !== 'production'){
    // }
    if (response.data.Status == 0) {
      let err = {}
      err.code = response.data.Status
      err.msg = response.data.Msg
      return Promise.reject(err)
    } else if (response.data.Status == 403) {
      router.push('/login')
    } else {
      return response
    }
  },
  error => {
    let err = {}
    if (error.response) {
      err.code = error.response.data.Status
      err.msg = error.response.data.Msg
    }
    if (error.response.status == 403) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

Vue.prototype.$http = axios

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
