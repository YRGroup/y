import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        showTopNav:true,
        showBottomNav:true,

        title:'育人教育',

        hasLogin: false,        
        role:'guest',

        currentUserId:null,
        currentClassId:null||19,
        currentStudentId:null||'z6vzso72',        
        currentStudent:{},   

        classHeader:true,
        stuHeader:true
    },
    mutations: {
        login(state,id) {
            state.hasLogin = true
            state.currentUserId = id

            localStorage.setItem('hasLogin', true)
            localStorage.setItem('id', id)
        },
        logout(state) {
            state.hasLogin = false
            state.role = '游客'

            localStorage.setItem('hasLogin', false)
            localStorage.setItem('id', null)
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
        showclassHeader(state,val){
            state.classHeader = val
        },
        showstuHeader(state,val){
            state.stuHeader = val
        }
    }
})

store.registerModule('loading', { 
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

export default store