<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <router-link :to="{ name: 'add-user' }">
                <button class="text-white float-right px-4 py-2 m-2 h-fit rounded-md bg-blue-500">Gebruiker Toevoegen</button>
            </router-link>
            <div class="p-4 text-center rounded-md">Alle gebruikers</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchUsers(0, $event, 'lastName', 'asc')" @goBack="searchUsers(0, '', 'lastName', 'asc')"
                class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortUsers('firstName', sortAscending)" class="w-36 font-extrabold text-left ml-8"><span class="material-symbols-outlined align-middle mr-1">sort_by_alpha</span>Voornaam</button>
            <button @click="sortUsers('lastName', sortAscending)" class="w-56 font-extrabold text-left"><span class="material-symbols-outlined align-middle mr-1">sort_by_alpha</span>Achternaam</button>
            <button @click="sortUsers('emailAddress', sortAscending)" class="font-extrabold text-left"><span class="material-symbols-outlined align-middle mr-1">sort_by_alpha</span>Email Adres</button>
            <!-- <span class="material-symbols-outlined">sort</span> -->
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <UserRow v-for="user in users" :key="user.id" v-bind:user="user">
            </UserRow>
        </div>

        <div>
            <PaginationBar v-bind:curPage="this.currentPage" v-bind:totalPages="this.totalPages" @changePage="changePageNumber($event)">

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
            placeholder: "Voor of Achter Naam",
            searchTerm: '',
            sortAscending: true,
            currentPage: 0,
            propertyToSortBy: 'lastName',
            pageableSize: 10,
            totalPages: -1
        };
    },
    mounted() {
        this.searchUsers(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchUsers(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            let parameterDto = {}
            parameterDto.searchTerm = searchTerm;
            parameterDto.propertyToSortBy = propertyToSortBy
            parameterDto.directionOfSort = sortAscending ? "asc" : "desc";
            parameterDto.pageNumber = currentPageNumber
            parameterDto.numberPerPage = this.pageableSize

            axios.post("http://localhost:8080/user/searchEndPoint", parameterDto)
                .then(response => {
                    this.users = response.data.content;
                    this.totalPages = response.data.totalPages;
                    this.currentPage = currentPageNumber;
                    this.searchTerm = searchTerm;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortUsers(propertyToSortBy) {
            this.currentPage = 0;
            if (propertyToSortBy != this.propertyToSortBy) {
                this.sortAscending = true;
                this.propertyToSortBy = propertyToSortBy;
            }
            else {
                this.sortAscending = !this.sortAscending
            }
            this.searchUsers(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPage + change
            if (tempPageNumber >= 0 && tempPageNumber <= (this.totalPages - 1)) {
                this.searchUsers(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.sortAscending)
            }
        },


    },
}
</script>
