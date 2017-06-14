let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'


// 获取班级所有信息
API.getAllClassInfo = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class?cid='+id).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// not OK

// 空API模板
API.default = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetDynamic?cid='+id).then((res)=>{
      console.log('获取信息成功：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}
// testing

export default API
