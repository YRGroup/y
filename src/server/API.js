const API = {}

API.config = function () {
  Bmob.initialize("38b5c33b1c0fdd6d39ea302d0a5071a0", "d870024b3314b4d1b680634105c8c600")
}

API.config()

import Mock from 'mockjs'

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

export default API
