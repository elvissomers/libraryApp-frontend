<template>
    <div class="flex flex-col w-fit bg-slate-300 p-8 rounded-3xl">

<div class="w-full">
        <button v-on:click="this.$emit('closeUserPopup')" type="button" class="float-right">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    </div>

        <div class="p-4 text-center rounded-md">All Users</div>
        <div class="content-center flex flex-row justify-between">
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchUsers(0, $event, 'lastName', 'asc')" @goBack="searchUsers(0, '', 'lastName', 'asc')"
                class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortUsers('firstName', sortAscending)" class="w-36 font-extrabold text-left ml-8">First Name</button>
            <button @click="sortUsers('lastName', sortAscending)" class="w-56 font-extrabold text-left">Last Name</button>
        </div>


        <div class="flex flex-col h-80 overflow-y-auto"
>
            <UsersRowPopup v-for="user in users" :key="user.id" v-bind:user="user">
            </UsersRowPopup>
        </div>

        <div>
            <PaginationBar v-bind:curPage="this.currentPage" @changePage="changePageNumber($event)">

            </PaginationBar>

        </div>

    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import UsersRowPopup from '@/components/details/book-detail-page/UsersRowPopup.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';

export default {
    name: 'UserPopup',
    components: {
        UsersRowPopup,
        SearchBar,
        PaginationBar,

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
        };
    },
    mounted() {
        this.searchUsers(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchUsers(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            const directionOfSort = sortAscending ? "asc" : "desc";
            let url = ''
            if (searchTerm == '') {
                url = 'http://localhost:8080/user/pageable/search/'+ propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
            }
            else {
                url = 'http://localhost:8080/user/pageable/search/'+ searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
            }

            axios.get(url)
                    .then(response => {
                        if (response.data.length > 0) {
                            this.users = response.data;
                            this.searchTerm = searchTerm;
                            this.currentPage = currentPageNumber;
                        }
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
            if (tempPageNumber >= 0) {
                this.searchUsers(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.directionOfSort)
            }
        },

    },
}
</script>