const staticAPI = {}

import Mock from 'mockjs'

staticAPI.sms = (tel) => {
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

staticAPI.getClassNews = (class_id) => {
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

// API默认格式
staticAPI.default = () => {
  return new Promise((resolve, reject) => {
    resolve(results)
    reject(error)
  })
}

export default staticAPI
