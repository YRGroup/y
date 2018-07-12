let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 获取节目列表
API.getProgramList = (para) => {
  return new Promise((resolve, reject) => {

    axios.get(_APIurl+'/api/LiveVideo/getProgramList',{params:para}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
API.programvote = (para) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/LiveVideo/programvote',para).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
API.getSignInList = (para) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/LiveVideo/signInList',para).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export default API
