import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        islogin: false,
        isNav:true,
        title:'育人教育',
        direction: 'forward',
        role:'guest',
        APItype:'server',
        reginfo:{},
        classId:'19',
        classInfo:{null:true}
    },
    mutations: {
        login(state,name) {
            state.islogin = true

            localStorage.setItem('islogin', true)
            localStorage.setItem('y_name', name)

            let expires = new Date(new Date().getTime() + 1000 * 3600 * 24 * 365*10)
            document.cookie = "y_name" + "=" + name + ";expires="+expires

            console.log(name+'login OK')
        },
        logout(state) {
            state.islogin = false

            localStorage.setItem('islogin', false)
            localStorage.setItem('y_name', null)

            let expires = new Date(new Date().getTime() + 1000 * 3600 * 24 * 365*10)
            document.cookie = "y_name" + "=" + null + ";expires="+expires

            console.log('logout success')
        },
        UPDATE_DIRECTION (state, direction) {
            state.direction = direction
        },
        changeRole(state,val){
            state.role=val.toString()
        },
        getClassInfo(state,val){
            state.classInfo=val
        },
        showNav(state,val){
            state.isNav=val
        },
        changeTitle(state,val){
            state.title=val.toString()
        }
    }
})

export default store