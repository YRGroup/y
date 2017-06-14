let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 获取学生信息
API.getStudentInfo = (studentId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Student/GetInfo?meid='+studentId).then((res)=>{
      console.log('获取到的学生信息：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 修改学生信息
API.editStudentInfo = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Student/ModifyInfo',data).then((res)=>{
      if(res.data.Msg!='ok'){
        console.log('修改的学生信息：')
        console.log(res)
        resolve(res.data.Msg)
      }else{
        reject(res.data.Msg)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 获取一卡通消费记录
API.getExamList = (userId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/User/GetFinanceLog?currentPage=1&pagesize=10',{
      params:{
        meid:userId
      }
    }).then((res)=>{
      console.log('获取到的一卡通消费记录：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 获取学生的成绩单
API.getExamScore = (userId,examid) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Student/GetExamScore',{
      params:{
        meid:userId,
        examid:examid||0
      }
    }).then((res)=>{
      console.log('获取到的当前考试成绩单信息：')
      console.log(res)
      resolve(res.data.Content[0])
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 获取考试列表
API.getExamList = (userId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Student/GetExamTotalScore',{
      params:{
        meid:userId
      }
    }).then((res)=>{
      console.log('获取到的考试列表信息：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

export default API
