const serverAPI = {}

import axios from 'axios'

serverAPI.getAllClassinfo = (id) => {
  return new Promise((resolve, reject) => {
    axios.get('http://192.168.3.188/api/Class?cid='+id).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// API默认格式
serverAPI.default = () => {
  return new Promise((resolve, reject) => {
    resolve(results)
    reject(error)
  })
}

export default serverAPI
