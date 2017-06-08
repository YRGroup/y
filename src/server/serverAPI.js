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
      console.log('获取到的班级信息：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing


// 获取班级动态列表
serverAPI.getAllClassDynamic = (classId,typeId,count) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetDynamicList',{
      params:{
        cid:classId,
        type:typeId||1,
        count:count||0
      }
  }).then((res)=>{
      console.log('获取到的班级动态：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 获取班级作业列表
serverAPI.getHomeworkList = (classId,count) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetHomeworkList',{
      params:{
        cid:classId,
        count:count||0
      }
  }).then((res)=>{
      console.log('获取班级作业列表：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 发布新班级作业
serverAPI.addHomework = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Class/AddHomework',data).then((res)=>{
      console.log('添加新班级作业成功：')
      console.log(res)
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
    axios.get(_APIurl+'/api/Class/GetDynamic',{
      params:{
        cid:classId,
        did:msgId
      }
    }).then((res)=>{
      console.log('获取到的动态信息：')
      console.log(res)
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
      resolve(res)
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
      resolve(res.data.Content)
      console.log('获取到的教师列表：')
      console.log(res)
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
      resolve(res.data.Content)
      console.log('获取到的学生列表信息：')
      console.log(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 获取班级的家长列表
serverAPI.getParentList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetParentList?cid='+classId).then((res)=>{
      console.log('获取到的家长列表信息：')
      console.log(res)
      resolve(res.data.Content)
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
      console.log('获取到的教师信息：')
      console.log(res)
      resolve(res.data.Content)
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
      console.log('获取到的教师动态列表信息：')
      console.log(res)
      resolve(res.data.Content)
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

// 查询用户站内消息列表
serverAPI.getMsgList = (day,count) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Chat/GetRecentChatList',{
      params:{
        day:day||0,
        count:count||0
      }
    }).then((res)=>{
      console.log('获取到的用户站内消息列表：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 查询用户消息对话列表
serverAPI.getMsgInfo = (userId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Chat/GetChatList',{
      params:{
        sendto:userId,
        minid:0,
        count:0
      }
    }).then((res)=>{
      let resData={}
      let replyData=[]
      let orginres=res.data.Content
      resData.sendto_Headimgurl=orginres.sendto_Headimgurl
      resData.sendto_TrueName=orginres.sendto_TrueName
      resData.sendto_meid=orginres.sendto_meid
      orginres.CL.forEach(function(el) {
        let thisreply={}
        thisreply.Content=el.Content
        thisreply.IsRead=el.IsRead
        thisreply.SendTo=el.SendTo
        let a = new Date(el.CreateTime)
        let today = new Date()
        if(a.Format("yyyy-MM-dd")===today.Format("yyyy-MM-dd")){
          thisreply.CreateTime=a.Format("hh:mm:ss")
        }else{
          thisreply.CreateTime=a.Format("yyyy-MM-dd")
        }
        replyData.push(thisreply)
      }, this);
      resData.CL=replyData
      console.log('获取到的用户站内消息列表：')
      console.log(resData)
      resolve(resData)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 回复消息
serverAPI.replyMsg = (msgdata) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Chat/AddChat',msgdata).then((res)=>{
      console.log('回复消息成功：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 获取学生信息
serverAPI.getStudentInfo = (studentId) => {
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

// 获取学生的成绩单
serverAPI.getExamScore = (userId,examid) => {
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
serverAPI.getExamList = (userId) => {
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

// 空API模板
serverAPI.default = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetDynamic?cid='+id).then((res)=>{
      console.log('获取到的教师动态列表信息：')
      console.log(res)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

export default serverAPI
