import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import API from '@/server/API'

const store = new Vuex.Store({
    state: {
        showTopNav:true,
        showBottomNav:true,

        title:'育人教育',

        hasLogin: false,        
        role:null||'guest',

        currentUserId:null,
        currentClassId:null||19,
        currentStudentId:null||'z6vzso72',        
        currentStudent:{},   

        token:null,
        hasStudent:false,
        currentUser:null,
        hasNoStudent:false,
        hasNewPost:false,
        hasNewMsg:'0',

        ApiUrl:''
    },
    getters:{
        isWeixin:function(){
            let ua = navigator.userAgent.toLowerCase()
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                return true;
            } else {
                return false;
            }
        },
    },
    mutations: {
        login(state,payload) {
            state.hasLogin = true
            state.currentUser = payload
            state.currentUserId = payload.Meid
            state.role = payload.Role

            if(payload.Role=='家长' && !payload.mock){
                if(payload.ExtendInfo.Students.length!=0){
                    state.hasNoStudent = false
                    state.currentClassId = payload.ExtendInfo.Students[0].ClassID
                }else{
                    state.hasNoStudent = true
                }
            }

            if(payload.Role=='教师' && !payload.mock){
                if(payload.ExtendInfo.Classes.length!=0){
                    state.currentClassId = payload.ExtendInfo.Classes[0].ClassID
                }
            }

            if(payload.HasNewUnReadDynamic==1){
                state.hasNewPost = true
            }

            state.hasNewMsg = payload.UnReadMsgCount.toString()


            localStorage.setItem('hasLogin', true)
            localStorage.setItem('id', payload.Meid)
            localStorage.setItem('role', payload.Role)
            localStorage.setItem('currentClassId', state.currentClassId)
        },
        logout(state) {
            state.hasLogin = false
            state.currentUserId = null
            state.role = 'guest'
            state.hasNoStudent = false
            state.hasNewPost = false

            localStorage.clear()
        },
        changeRole(state,val){
            state.role=val.toString()
        },
        getClassInfo(state,val){
            state.classInfo=val
        },
        showNav(state,val){
            state.showTopNav=val
            state.showBottomNav=val
        },
        changeTitle(state,val){
            state.title=val.toString()
        },
        changeCurrentStudent(state,val){
            state.currentStudent = val
        },
        setToken(state,val){
            state.token = val
        },
        setApiUrl(state,val){
            state.ApiUrl=val
        }
    },
    actions:{
        setApiUrl({commit,state},payload){
            if(sessionStorage.ApiUrl){
                commit('setApiUrl',sessionStorage.ApiUrl)
            }else{
                API.getApiUrl(payload).then(res=>{
                    sessionStorage.ApiUrl=res
                    commit('setApiUrl',sessionStorage.ApiUrl)
                })
            }
        },
        login({getters,commit,state},payload){
            return new Promise((resolve, reject) => {
                API.login(payload).then(res=>{
                    localStorage.setItem('user', JSON.stringify(res))
                    commit('setToken', res.Token)
                    commit('login', res)
                    resolve(res)
                })
            })
        },
    },
})

export default store