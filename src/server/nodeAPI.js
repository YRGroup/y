const nodeAPI = {}

import axios from 'axios'

nodeAPI.newClassPost = (data) => {
  return new Promise((resolve, reject) => {
    axios.post('http://192.168.3.195:3000/class/new',data).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

nodeAPI.getAllClassPost = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://192.168.3.195:3000/class/all').then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

nodeAPI.newSchoolPost = (data) => {
  return new Promise((resolve, reject) => {  
    axios.post('http://192.168.3.195:3000/school/new',data).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

nodeAPI.newComment = (data) => {
  return new Promise((resolve, reject) => {
    resolve(results)
    reject(error)
  })
}

// API默认格式
nodeAPI.default = () => {
  return new Promise((resolve, reject) => {
    resolve(results)
    reject(error)
  })
}

export default nodeAPI
