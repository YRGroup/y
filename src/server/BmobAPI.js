const BmobAPI = {}

// BmobAPI.config = function () {
//   Bmob.initialize("38b5c33b1c0fdd6d39ea302d0a5071a0", "d870024b3314b4d1b680634105c8c600")
// }

// BmobAPI.config()

// // 使用bmob的API
// BmobAPI.signup = (info) => {
//   return new Promise((resolve, reject) => {
//     console.log(info)
//     let user = new Bmob.User()
//     user.set("username", info.name)
//     user.set("password", info.pw)
//     user.set("child", info.child)
//     // user.set("email", info.mail)
//     user.set("mobilePhoneNumber", info.tel)
//     user.signUp(null, {
//       success: function (user) {
//         resolve(user)
//       },
//       error: function (user, error) {
//         reject(error)
//         alert("Error: " + error.code + " " + error.message);
//       }
//     })
//   })
// }

// BmobAPI.addstudent = (info) => {
//   return new Promise((resolve, reject) => {
//     let Student = Bmob.Object.extend("Student")
//     var student = new Student()
//     student.set("name", info.name)
//     student.set("pw", info.pw)
//     student.set("xuehao", info.xuehao)
//     student.save(null, {
//       success: function (user) {
//         resolve(user)
//       },
//       error: function (user, error) {
//         reject(error)
//         alert("Error: " + error.code + " " + error.message);
//       }
//     })
//   })
// }

// BmobAPI.login = (userName, userPassword) => {
//   return new Promise((resolve, reject) => {
//     Bmob.User.logIn(userName, userPassword, {
//       success: function (user) {
//         resolve(user)
//       },
//       error: function (user, error) {
//         reject(error)
//       }
//     })
//   })
// }

// BmobAPI.logout = () => {
//   return new Promise((resolve, reject) => {
//     resolve(results)
//     reject(error)
//   })
// }


// // API默认格式
// BmobAPI.default = () => {
//   return new Promise((resolve, reject) => {
//     resolve(results)
//     reject(error)
//   })
// }

export default BmobAPI
