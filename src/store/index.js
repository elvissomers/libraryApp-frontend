import { createStore } from 'vuex'
import axios from 'axios';
import router from '../router'

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
        login(state, user){
            // Login user 
            axios.post('http://localhost:8080/api/user/login', user)
                .then(response => {
                    // Set token & admin
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('admin', response.data.admin);

                    // Set state
                    if (localStorage.getItem('admin') == 'true') {
                        state.admin = true
                    } else {
                        state.admin = false
                    }
                    state.token = localStorage.getItem('token')

                    router.push('/')
                })
                .catch(error => {
                    console.log(error);
                })
        },

        logout(state) {
            // Delete token in de backend
            const config = {
                headers: {
                    'Authentication': localStorage.getItem('token')
                }
            }

            axios.put('http://localhost:8080/user/logout', null, config)
                .then(response => {
                    console.log('Token deleted:', response.data);
                })
                .catch(error => {
                    console.log(error);
                })

            // Delete token & admin in localStorage, then state
            localStorage.removeItem('admin')
            localStorage.removeItem('token')
            state.admin = null
            state.token = null

            router.push('/login')
        }
    }
})


