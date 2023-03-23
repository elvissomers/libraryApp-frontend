<template>
    <!-- removed:  w-4/6 mx-auto -->
    <div class="h-full bg-gray-100 p-8">
        <div class="bg-white rounded-lg shadow-xl pb-8">
            <div class="absolute right-12 mt-4 flex flex-nowrap">
                <div class="rounded mr-4">
                    <button v-if="store.getters.isAdmin" class="flex text-white bg-teal-500 border-0 py-2 px-3 focus:outline-none hover:bg-teal-600 rounded"
                    @click="showBookPopup = true">
                    + <span class="material-symbols-outlined"> menu_book</span></button>
                </div>

                <div class="rounded">
                <!-- removed: @click="openSettings = !openSettings" class="hover:text-gray-200"-->
                <div v-if="$route.query.parent != 'UserRow'">  
                    <router-link v-if="store.getters.isAdmin" :to="{ name: 'update-user', query:{parent: 'UserDetail'} }">
                        <button class="flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded">Wijzig profiel (admin)</button>
                    </router-link>
                </div>  
                    <router-link v-if="!store.getters.isAdmin" :to="{ name: 'edit-myaccount' }">
                        <button class="flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded">Wijzig profiel (user)</button>
                    </router-link>
                </div>
            </div>
            <div class="w-full h-[250px]">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg">
            </div>
            <div class="flex flex-col items-center -mt-20">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg" class="w-40 border-4 border-white rounded-full">
                <div class="flex items-center space-x-2 mt-2">
                    <!-- name -->
                    <p class="text-2xl">{{ user.firstName }} {{ user.lastName }}</p>
                    
                </div>
            </div>
        </div>

        <!-- removed: 2xl:flex-row 2xl:space-y-0 2xl:space-x-4-->
        <div class="my-4 flex flex-col space-y-4">
            <!-- removed: 2xl:w-1/3 -->
            <div class="w-full flex flex-col ">
                <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 class="text-xl text-gray-900 font-bold">Persoonlijke gegevens</h4>
                    <ul class="mt-2 text-gray-700">
                        <li class="flex border-y py-2">
                            <span class="font-bold w-24">Naam:</span>
                            <span class="text-gray-700">{{ user.firstName }} {{ user.lastName }}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Email:</span>
                            <span class="text-gray-700">{{ user.emailAddress }}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Beheerder:</span>
                            <span class="text-gray-700">{{ user.Admin }}</span>
                        </li>  
                    </ul>
                </div>
            </div>
        </div>
        <BookPopup v-if="showBookPopup" @close="showBookPopup = false" />
    </div>
</template>

<script>
    import axios from 'axios';
    import store from '@/store';
    import BookPopup from '@/components/details/book-detail-page/BooksPopup.vue'

    export default {
        components: {
            BookPopup,
        },
    name: 'UserDetail',
    data() {
        return {
            showBookPopup: false,
            user: [],
            store
        };
    },
    mounted() {
        console.log('id: ' + this.$route.params.id)
        this.getUser()
        console.log(this.user)
    },
    methods: {
        getUser() {
        axios.get('http://localhost:8080/user/get/' + this.$route.params.id)
            .then(response => {
            this.user = response.data;
            })
            .catch(error => {
            console.log(error);
            });
        },
    },
}

</script>