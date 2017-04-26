const API = {}

API.config = function() {
    // Bmob.initialize("eceabd3b15a34530105b3749edc446c6", "7e048987730232ad761ad87223e70328")
}

API.config()

import Mock from 'mockjs'

API.signup = (info) => {
    return new Promise((resolve, reject) => {
        console.log(info)
        let data = Mock.mock({
            'list|1-10': [{
                'id|+1': 1
            }]
        })
        resolve(data.list)
        reject(data)
        // console.log(JSON.stringify(data, null, 4))
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

export default API