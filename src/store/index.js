// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
import { createStore } from 'vuex'

export default createStore({
    state: {
        admin: localStorage.getItem('admin'),
        token: localStorage.getItem('token') || null
    },
    getters: {
        isAdmin(state) {
            return state.admin
        },
        // Returns true if tokens exists, and false otherwise
        isAuthenticated(state) {
            return !!state.token
        }
    },
    mutations: {
        logout(state, router) {
            console.log("logging out")
            state.admin = null
            state.token = null
            localStorage.removeItem('admin')
            localStorage.removeItem('token')
            router.push('/login')
        }
    },
})


