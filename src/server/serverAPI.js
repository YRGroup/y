const serverAPI = {}

import axios from 'axios'

const APIurl = 'http://192.168.3.188'

serverAPI.getAllClassInfo = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(APIurl+'/api/Class?cid='+id).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// testing
serverAPI.getClassInfo = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(APIurl+'/api/Class/GetInfo?cid='+classId).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// testing
serverAPI.getAllClassDynamic = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(APIurl+'/api/Class/GetDynamicList?cid='+classId).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// not OK
serverAPI.getClassDynamic = (classId,msgId) => {
  return new Promise((resolve, reject) => {
    axios.get(APIurl+'/api/Class/GetDynamic?cid='+classId+'&did='+msgId).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// not ok
serverAPI.postNewComment = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(APIurl+'/api/Class/AddComment',data).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// API默认格式
serverAPI.default = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(APIurl+'/api/Class/GetDynamic?cid='+id).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export default serverAPI
