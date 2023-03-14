<template>
    <div class="flex flex-col w-full mx-8">


        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">All Users</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchUsers($event)" @goBack="getUsers()" class="m-2">
            </SearchBar>
        </div>



        <div class="flex flex-row py-4 border-b-2">
            <div class="w-12 ml-8 font-extrabold">Id</div>
            <div class="w-28 font-extrabold">Name</div>
            <div class="w-28 font-extrabold">Surname</div>
            <div class="w-28 font-extrabold">Email Address</div>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <UserRow v-for="user in users" :key="user.id" v-bind:user="user">
            </UserRow>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import UserRow from '@/components/admin-panel/user-overview/UserRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';

export default {
    name: 'UsersView',
    components: {
        UserRow,
        SearchBar
    }
    ,
    data() {
        return {
            users: [],
            placeholder: "First or last name",
        };
    },

    mounted() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            axios.get('http://localhost:8080/user')
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        searchUsers(searchTerm) {
            axios.get('http://localhost:8080/usersearch/'+searchTerm+'/0/50')
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

    },
}
</script>