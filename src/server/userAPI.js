let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'
import md5 from 'js-md5'

API.AUTH_SIGN

// 登陆
API.login = (logData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/User/LoginByPhone',logData).then((res)=>{
      console.log('登陆信息：')
      console.log(res)
      let token = res.data.Content.Token
      localStorage.setItem('TOKEN', token)

      if(res.data.Msg==='OK'){
        resolve(res.data.Content)
      }else{
        reject(res.data.Msg)
      }
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 用户注册
API.userReg = (regdata) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/User/RegisterByPhone',regdata).then((res)=>{
      console.log('注册信息：')
      console.log(res)
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
      console.log('修改密码的信息：')
      console.log(res)
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
      console.log('添加学生后的信息：')
      console.log(res)
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
      console.log('修改后的信息：')
      console.log(res)
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
      console.log('修改后的信息：')
      console.log(res)
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
      console.log('添加学生后的信息：')
      console.log(res)
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

export default API
