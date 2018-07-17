let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 获取直播评论列表
API.getCommentsList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/LiveVideo/getlist',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 发送直播评论
API.sendComment = (para) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/LiveVideo/add',para).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
//删除评论
API.delComment = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/LiveVideo/delete',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
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

// 获取单个直播间信息
API.getOneLiveRoom = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/LiveVideo/GetOneLiveRoom',{ params: para}).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
export default API
