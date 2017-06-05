const serverAPI = {}

import axios from 'axios'

// API根目录
const _APIurl = 'http://192.168.3.188'


// 获取班级所有信息
serverAPI.getAllClassInfo = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class?cid='+id).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// not OK


// 获取班级信息
serverAPI.getClassInfo = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetInfo?cid='+classId).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing


// 获取班级动态列表
serverAPI.getAllClassDynamic = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetDynamicList?cid='+classId).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing


// 获取单条班级动态
serverAPI.getClassDynamic = (classId,msgId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetDynamic?cid='+classId+'&did='+msgId).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing


// 添加班级动态
serverAPI.postNewClassDynamic = (classDynamicData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Class/AddDynamic',classDynamicData).then((res)=>{
      if(res.data.Status===1){
        resolve(res)
      }else{
        let error ={}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing


// 添加班级动态评论
serverAPI.postNewComment = (replyData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Class/AddComment',replyData).then((res)=>{
      if(res.data.Status===1){
        resolve(res)
      }else{
        let error ={}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing


// 点赞班级动态
serverAPI.doLikeThisPost = (classDynamicId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/Zan?did='+classDynamicId).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing


// 获取班级的教师列表
serverAPI.getTeacherList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetTeacherList?cid='+classId).then((res)=>{
      if(res.data.Status===1){
        resolve(res.data.Content)
      }else{
        let error ={}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 获取班级的学生列表
serverAPI.getStudentList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetStudentList?cid='+classId).then((res)=>{
      if(res.data.Status===1){
        resolve(res.data.Content)
      }else{
        let error ={}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 获取教师信息
serverAPI.getTeacherInfo = (teacherId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Teacher/GetInfo?meid='+teacherId).then((res)=>{
      if(res.data.Status===1){
        resolve(res.data.Content)
      }else{
        let error ={}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing


// 获取教师发表的动态列表
serverAPI.getAllTeacherDynamic = (teacherId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Teacher/GetDynamicList?meid='+teacherId).then((res)=>{
      if(res.data.Status===1){
        resolve(res.data.Content)
      }else{
        let error ={}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 获取当前用户信息
serverAPI.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/User/GetInfo').then((res)=>{
      if(res.data.Status===1){
        resolve(res.data.Content)
      }else{
        let error ={}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing


// 空API模板
serverAPI.default = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetDynamic?cid='+id).then((res)=>{
      if(res.data.Status===1){
        resolve(res.data.Content)
      }else{
        let error ={}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

export default serverAPI
