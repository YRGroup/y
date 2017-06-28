let API = {}

import axios from 'axios'


import _APIurl from './config'
import md5 from 'js-md5'
import store from '@/store'

API.AUTH_SIGN

// 登陆
API.login = (logData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/User/LoginByPhone',logData).then((res)=>{
      // console.log('登陆信息：')
      // console.log(res)
      let token = res.data.Content.Token
      // localStorage.setItem('TOKEN', token)
      store.commit('setToken', token)
      resolve(res.data.Content)
      
      // if(res.data.Msg==='OK'){
      //   resolve(res.data.Content)
      // }else{
      //   reject(res.data.Msg)
      // }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 用户注册
API.userReg = (regdata) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/User/RegisterByPhone',regdata).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log(err)      
      reject(err)
    })
  })
}
// testing

// 修改密码
API.changePassword = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/User/ModifyPassword',data).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log(err)      
      reject(err)
    })
  })
}
// testing

// 家长添加学生
API.addStudent = (addStudentData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Parent/BindStudent',addStudentData).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 修改家长资料
API.editParentInfo = (editData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Parent/ModifyInfo',editData).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 修改教师资料
API.editTeacherInfo = (editData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Teacher/ModifyInfo',editData).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 获取当前用户信息
API.getCurrentUser = () => {
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
      console.log(err)      
      reject(err)
    })
  })
}
// testing

// 家长添加学生
API.addStudent = (addStudentData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Parent/BindStudent',addStudentData).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

export default API