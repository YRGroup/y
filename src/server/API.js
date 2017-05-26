var API = {}

import axios from 'axios'

// Bmob设置
API.config = function () {
  Bmob.initialize("38b5c33b1c0fdd6d39ea302d0a5071a0", "d870024b3314b4d1b680634105c8c600")
}
API.config()

// 使用bmob的API
API.signup = (info) => {
  return new Promise((resolve, reject) => {
    console.log(info)
    let user = new Bmob.User()
    user.set("username", info.name)
    user.set("password", info.pw)
    user.set("child", info.child)
    // user.set("email", info.mail)
    user.set("mobilePhoneNumber", info.tel)
    user.signUp(null, {
      success: function (user) {
        resolve(user)
      },
      error: function (user, error) {
        reject(error)
        alert("Error: " + error.code + " " + error.message);
      }
    })
  })
}

API.addstudent = (info) => {
  return new Promise((resolve, reject) => {
    let Student = Bmob.Object.extend("Student")
    var student = new Student()
    student.set("name", info.name)
    student.set("pw", info.pw)
    student.set("xuehao", info.xuehao)
    student.save(null, {
      success: function (user) {
        resolve(user)
      },
      error: function (user, error) {
        reject(error)
        alert("Error: " + error.code + " " + error.message);
      }
    })
  })
}

API.login = (userName, userPassword) => {
  return new Promise((resolve, reject) => {
    Bmob.User.logIn(userName, userPassword, {
      success: function (user) {
        resolve(user)
      },
      error: function (user, error) {
        reject(error)
      }
    })
  })
}

API.logout = () => {
  return new Promise((resolve, reject) => {
    resolve(results)
    reject(error)
  })
}

// 自定义API
API.sms = (tel) => {
  return new Promise((resolve, reject) => {
    var config = {
      app_key: '23791472',
      secret: '5be7d069598ca6ca69f10f31cc6731a7'
    };
    var app = new AliDaYu(config);
    var options = {
      sms_free_sign_name: '371p物联网',
      sms_param: {
        number: '123456'
      },
      rec_num: tel,
      sms_template_code: 'SMS_47995098',
    };
    app.sms(options, function (error, response) {
      resolve(response)
      console.log(response)
      reject(error)
    })
  })
}

API.getClassNews = (class_id) => {
  return new Promise((resolve, reject) => {
    let results = [{
        'img': require('@/assets/face/dk.png'),
        'name': '李老师',
        'date': '2017-4-25',
        'class': '班级公告',
        'content': '第一期不上进学生回炉再教育培训班已经开课，请各位名单上的同学准时到场参加培训。',
        'read': '40',
        'liked': '3',
        'comment': [{
            'name': '孙连城的家长',
            'content': '还望李老师能尽心，把我们家孩子教育好。'
          },
          {
            'name': '李小明',
            'content': '大家不要气馁，加油学习，你也能逆袭。'
          }
        ]
      },
      {
        'img': require('@/assets/face/dk.png'),
        'name': '李老师',
        'date': '2017-4-25',
        'class': '班级公告',
        'content': '第一期不上进学生回炉再教育培训班已经开课，请各位名单上的同学准时到场参加培训。',
        'read': '40',
        'liked': '3',
        'comment': [{
            'name': '孙连城的家长',
            'content': '还望李老师能尽心，把我们家孩子教育好。'
          },
          {
            'name': '李小明',
            'content': '大家不要气馁，加油学习，你也能逆袭。'
          }
        ]
      },
      {
        'img': require('@/assets/face/dk.png'),
        'name': '李老师',
        'date': '2017-4-25',
        'class': '班级公告',
        'content': '第一期不上进学生回炉再教育培训班已经开课，请各位名单上的同学准时到场参加培训。',
        'read': '40',
        'liked': '3',
        'comment': [{
            'name': '孙连城的家长',
            'content': '还望李老师能尽心，把我们家孩子教育好。'
          },
          {
            'name': '李小明',
            'content': '大家不要气馁，加油学习，你也能逆袭。'
          }
        ]
      }
    ]
    resolve(results)
    reject('error')
  })
}

//  192.168.3.195的API
API.newClassPost = (data) => {
  return new Promise((resolve, reject) => {
    axios.post('http://192.168.3.195:3000/class/new',data).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

API.getAllClassPost = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://192.168.3.195:3000/class/all').then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

API.newSchoolPost = (data) => {
  return new Promise((resolve, reject) => {  
    axios.post('http://192.168.3.195:3000/school/new',data).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

API.newComment = (data) => {
  return new Promise((resolve, reject) => {
    resolve(results)
    reject(error)
  })
}

//  192.168.3.188的API
API.getAllClassinfo = (id) => {
  return new Promise((resolve, reject) => {
    axios.get('http://192.168.3.188/api/Class?cid='+id).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// API默认格式
API.default = () => {
  return new Promise((resolve, reject) => {
    resolve(results)
    reject(error)
  })
}

export default API
