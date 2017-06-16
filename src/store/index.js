import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

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
    },
    mutations: {
        login(state,payload) {
            state.hasLogin = true
            state.currentUserId = payload.id
            state.role = payload.role

            localStorage.setItem('hasLogin', true)
            localStorage.setItem('id', payload.id)
            localStorage.setItem('role', payload.role)
        },
        logout(state) {
            state.hasLogin = false
            state.currentUserId = null
            state.role = 'guest'

            localStorage.setItem('hasLogin', false)
            localStorage.setItem('id', null)
            localStorage.setItem('role', 'guest')            
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
        }
    }
})

export default store