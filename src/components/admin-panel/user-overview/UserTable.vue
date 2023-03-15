<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <router-link :to="{ name: 'add-user' }">
                <button class="text-white float-right px-4 py-2 m-2 h-fit rounded-md bg-blue-500">Gebruiker Toevoegen</button>
            </router-link>
            <div class="p-4 text-center rounded-md">All Users</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchUsers(0, $event)" @goBack="getStartState()"
                class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortUsers(0, 'name')" class="w-36 font-extrabold text-left ml-8">First Name</button>
            <button @click="sortUsers(0, 'surname')" class="w-56 font-extrabold text-left">Last Name</button>
            <button @click="sortUsers(0, 'emailAddress')" class="font-extrabold text-left">Email Address</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <UserRow v-for="user in users" :key="user.id" v-bind:user="user">
            </UserRow>
        </div>

        <div>
            <PaginationBar v-bind:curPage="this.currentPages[this.currentFunction]" @changePage="changePageNumber($event)">

            </PaginationBar>

        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import UserRow from '@/components/admin-panel/user-overview/UserRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';

export default {
    name: 'UserView',
    components: {
        UserRow,
        SearchBar,
        PaginationBar
    },
    data() {
        return {
            users: [],
            placeholder: "Enter first or last name",
            searchTerm: '',
            lastDirection: { 'name': 'desc', 'surname': 'desc', 'emailAddress': 'desc' },
            currentPages: { 'getUsers': 0, 'searchUsers': 0, 'sortNonSearchUsers': 0, 'sortSearchUsers': 0 },
            currentFunction: 'getUsers',
            lastPropertyToSortBy: '',
            pageableSize: 2
        };
    },
    mounted() {
        this.getUsers(0);
    },
    methods: {

        getUsers(currentPageNumber) {
            this.currentFunction = 'getUsers';
            this.currentPages = { 'getUsers': this.currentPages['getUsers'], 'searchUsers': 0, 'sortNonSearchUsers': 0, 'sortSearchUsers': 0 }
            this.search = false;
            axios.get('http://localhost:8080/user/pageable/get/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.users = response.data;
                        this.searchTerm = '';
                        this.currentPages[this.currentFunction] = currentPageNumber;

                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        searchUsers(currentPageNumber, searchTerm) {
            this.currentFunction = 'searchUsers'
            if (this.searchTerm == searchTerm) {
                this.currentPages = { 'getUsers': 0, 'searchUsers': this.currentPages['searchUsers'], 'sortNonSearchUsers': 0, 'sortSearchUsers': 0 }
            }
            console.log('used')
            axios.get('http://localhost:8080/user/pageable/search/' + searchTerm + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.users = response.data;
                        this.searchTerm = searchTerm;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortUsers(currentPageNumber, propertyToSortBy) {
            const prev_direction = this.lastDirection[propertyToSortBy];
            let directionOfSort = '';
            this.lastPropertyToSortBy = propertyToSortBy
            if (prev_direction == 'asc') {
                directionOfSort = 'desc'
                this.lastDirection[propertyToSortBy] = 'desc'
            }
            else {
                directionOfSort = 'asc'
                this.lastDirection[propertyToSortBy] = 'asc'
            }

            if (this.searchTerm == '') {
                this.sortNonSearchUsers(currentPageNumber, propertyToSortBy, directionOfSort)
            }
            else {
                this.sortSearchUsers(currentPageNumber, propertyToSortBy, directionOfSort)
            }
        },

        sortNonSearchUsers(currentPageNumber, propertyToSortBy, directionOfSort) {
            this.currentFunction = 'sortNonSearchUsers'
            this.currentPages = { 'getUsers': 0, 'searchUsers': 0, 'sortNonSearchUsers': this.currentPages['sortNonSearchUsers'], 'sortSearchUsers': 0 }
            axios.get('http://localhost:8080/user/pageable/search/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.users = response.data;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortSearchUsers(currentPageNumber, propertyToSortBy, directionOfSort) {
            this.currentFunction = 'sortSearchUsers'
            this.currentPages = { 'getUsers': 0, 'searchUsers': 0, 'sortNonSearchUsers': 0, 'sortSearchUsers': this.currentPages['sortSearchUsers'] }
            axios.get('http://localhost:8080/user/pageable/search/' + this.searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.users = response.data;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPages[this.currentFunction] + change
            if (this.currentFunction == 'getUsers' && tempPageNumber >= 0) {
                this.getUsers(tempPageNumber)
            }
            if (this.currentFunction == 'searchUsers' && tempPageNumber >= 0) {
                this.searchUsers(tempPageNumber, this.searchTerm)
            }
            if (this.currentFunction == 'sortNonSearchUsers' && tempPageNumber >= 0) {
                this.sortNonSearchUsers(tempPageNumber, this.lastPropertyToSortBy, this.lastDirection[this.lastPropertyToSortBy])
            }
            if (this.currentFunction == 'sortSearchUsers' && tempPageNumber >= 0) {
                this.sortSearchUsers(tempPageNumber, this.lastPropertyToSortBy, this.lastDirection[this.lastPropertyToSortBy])
            }
        },


        getStartState() {
            this.searchTerm = '',
                this.lastDirection = { 'name': 'desc', 'surname': 'desc', 'emailAddress': 'desc' },
                this.currentPages = { 'getUsers': 0, 'searchUsers': 0, 'sortNonSearchUsers': 0, 'sortSearchUsers': 0 },
                this.currentFunction = 'getUsers',
                this.lastPropertyToSortBy = '',
                this.getUsers(0)
        },

    },
}
</script>