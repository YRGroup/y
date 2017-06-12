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
    },
    mutations: {
        login(state,id) {
            state.hasLogin = true
            state.currentUserId = id

            localStorage.setItem('hasLogin', true)
            localStorage.setItem('id', id)

            let expires = new Date(new Date().getTime() + 1000 * 3600 * 24 * 365*10)
            document.cookie = "hasLogin" + "=" + 'true' + ";expires="+expires
            document.cookie = "id" + "=" + id + ";expires="+expires

        },
        logout(state) {
            state.hasLogin = false
            state.role = '游客'

            localStorage.setItem('hasLogin', false)
            localStorage.setItem('id', null)

            let expires = new Date(new Date().getTime() + 1000 * 3600 * 24 * 365*10)
            document.cookie = "hasLogin" + "=" + 'false' + ";expires="+expires
            document.cookie = "id" + "=" + 'null' + ";expires="+expires
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