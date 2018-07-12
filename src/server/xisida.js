let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 获取班级信息
API.getProgramList = () => {
  return new Promise((resolve, reject) => {
    axios.get('getProgramList').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
API.vote = () => {
  return new Promise((resolve, reject) => {
    axios.get('vote').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
API.getSignInList = () => {
  return new Promise((resolve, reject) => {
    axios.get('signInList').then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export default API
