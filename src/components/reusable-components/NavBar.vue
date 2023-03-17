<template>
    <!-- removed: place-items-center flex flex-wrap h-screen mb-20-->
    <div class="">
        <section class="relative mx-auto my-auto">
            <!-- navbar -->
            <nav class="flex justify-between bg-zinc-900 text-white w-screen">
                <div class="px-5 xl:px-12 py-6 flex w-full items-center">
                    <router-link to="/" class="text-3xl font-bold font-heading"><img
                            src="https://www.workingtalent.nl/_nuxt/img/wt-logo-white.8cc9feb.svg" title="Logo"
                            alt="Logo"></router-link>
                    <!-- Nav Links -->
                    <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                        <li><router-link to="/" class="hover:text-gray-200">Catalogue</router-link></li>
                        <li><router-link to="/mybooks" class="hover:text-gray-200">My Books</router-link></li>
                        <li><router-link to="/admin/edit-users" class="hover:text-gray-200">Admin panel</router-link></li>
                        <!-- <li><router-link to="/mytestpage" class="hover:text-gray-200">Jims test page</router-link></li> -->
                        <li><router-link to="/" @click="logOut" class="flex items-center hover:text-gray-200">
                                Log out
                            </router-link></li>
                    </ul>


                    <!-- Account -->
                    <div class="hidden xl:flex items-center space-x-5 items-center">
                        <router-link v-if="authenticated" to="/" @click="logOut"
                            class="flex items-center hover:text-gray-200">
                            Log out
                        </router-link>
                        <!-- Sign In / Register      -->
                        <router-link to="/myaccount" class="flex items-center hover:text-gray-200">My Account
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </router-link>

                        <!-- <div class="flex justify-end px-4 pt-4">
                            <button id="dropdownButton" data-dropdown-toggle="dropdown"
                                class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                                type="button">
                                <span class="sr-only">Open dropdown</span>
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                    </path>
                                </svg>
                            </button>

                            <div id="dropdown"
                                class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul class="py-2" aria-labelledby="dropdownButton">
                                    <li>
                                        <a href="#"
                                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export
                                            Data</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                    </li>
                                </ul>
                            </div>
                        </div> -->

                    </div>
                </div>
                <!-- Responsive navbar -->
                <a class="xl:hidden flex mr-6 items-center" href="#">
                </a>
                <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </a>
            </nav>

        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'NavBar',
    data() {
        return {
            // authenticated: false
        }
    },
    props: ['authenticated'],
    mounted() {
        // this.setAuthenticated()
    },
    methods: {
        // setAuthenticated() {
        //     if (localStorage.getItem('token') != null) {
        //         this.authenticated = true;
        //     }
        // },
        logOut() {
            // Empty token on backend, then frontend
            this.emptyToken()
            localStorage.clear()

            this.$router.push('login');
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