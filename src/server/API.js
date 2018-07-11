import serverAPI from'./serverAPI'
import userAPI from'./userAPI'
import classAPI from'./classAPI'
import contactAPI from'./contactAPI'
import studentAPI from'./studentAPI'
import teacherAPI from'./teacherAPI'
import examAPI from'./examAPI'
import videoAPI from'./videoAPI'
import liveAPI from'./liveAPI'

//西斯达api
import xsdAPI from './xisida'

// mock数据
import  * as mockAPI from'./mock'
let API = Object.assign({},serverAPI,userAPI,classAPI,contactAPI,studentAPI,teacherAPI,examAPI,videoAPI,liveAPI,xsdAPI,mockAPI)

export default API