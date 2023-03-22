<template>
    <!-- removed: place-items-center flex flex-wrap h-screen mb-20-->
    <div class="">
        <section class="relative mx-auto my-auto">
            <!-- navbar -->
            <nav class="flex justify-between bg-zinc-900 text-white w-full">
                <div class="px-5 xl:px-12 py-6 flex w-full items-center">
                    <router-link to="/" class="text-3xl font-bold font-heading"><img
                            src="https://www.workingtalent.nl/_nuxt/img/wt-logo-white.8cc9feb.svg" title="Logo"
                            alt="Logo"></router-link>
                    <!-- Nav Links -->
                    <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                        <li v-if="store.authenticated"><router-link to="/" class="hover:text-gray-200">Catalogue</router-link></li>
                        <li v-if="store.authenticated"><router-link to="/mybooks" class="hover:text-gray-200">My Books</router-link></li>
                        <li v-if="store.authenticated && store.admin"><router-link to="/admin/edit-users" class="hover:text-gray-200">Admin panel</router-link></li>
                        <!-- <li>Auth: {{ store.authenticated }}</li>                  -->
                    </ul>
                    <!-- Account, removed: class="hidden xl:flex items-center space-x-5 items-center"-->

                    <!-- <li v-if="store.authenticated"><router-link to="/" @click="logOut" class="flex items-center hover:text-gray-200">
                            Log out
                        </router-link></li>        -->
                    <div v-if="store.authenticated" class="flex-nowrap">
                        <router-link to="/" @click="logOut" class="mx-2 align-middle hover:text-gray-200">
                            Log out
                        </router-link>
                        <!-- Sign In / Register removed: My Account-->
                        <router-link to="/user/2" class=" hover:text-gray-200">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg> -->
                            <span class="material-symbols-outlined align-middle">account_circle</span>
                        </router-link>
                    </div>
                    <!-- Responsive navbar -->
                    <!-- <a class="xl:hidden flex mr-6 items-center" href="#">
                    </a>
                    <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </a> -->
                </div>
            </nav>

        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '@/store/store'

export default {
    name: 'NavBar',
    data() {
        return {
            store
        }
    },    
    mounted() {
    },
    methods: {
        logOut() {
            // Clear token on backend, then frontend
            this.emptyToken()
            localStorage.clear()

            // Clear state
            store.clearAdmin()
            store.clearAuthentication()

            this.$router.push('/login');
        },
        emptyToken() {
            const config = {
                headers: {
                    'Authentication': localStorage.getItem('token')
                }
            }
            axios.put('http://localhost:8080/user/logout', null, config)
                .then(response => {
                    console.log(1)
                    console.log('Token deleted:', response.data);
                })
                .catch(error => {
                    console.log(error);
                    console.log(2)
                })
        },
    }
}
</script>