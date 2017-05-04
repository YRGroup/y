const API = {}

API.config = function() {
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
            success: function(user) {
                resolve(user)
            },
            error: function(user, error) {
                reject(error)
                alert("Error: " + error.code + " " + error.message);
            }
        })        
    })
}

API.login = (userName, userPassword) => {
    return new Promise((resolve, reject) => {
        resolve(results)
        reject(error)
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
            sms_param : {number:'123456'} ,
            rec_num: tel,
            sms_template_code: 'SMS_47995098',
        };
        app.sms(options,function(error,response){
            resolve(response)
            console.log(response)
            reject(error)
        })
    })
}

export default API