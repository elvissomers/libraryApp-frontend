<template>
    <div class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">

    <div class="flex flex-col w-fit bg-white p-8 rounded-3xl fixed top-8">

        <div class="w-full">
            <button v-on:click="this.$emit('closeUserPopup')" type="button" class="float-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div class="pt-4 pb-2 text-center rounded-md underline underline-offset-8 font-extrabold text-xl">Wijs gebruiker toe aan boek:</div>
        <div class="text-center rounded-md font-extrabold text-xl">{{ title }}</div>
        <div class="content-center flex flex-row justify-between">
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchUsers(0, $event, 'lastName', 'asc')"
                @goBack="searchUsers(0, '', 'lastName', 'asc')" class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortUsers('firstName', sortAscending)" class="w-36 font-extrabold text-left ml-8 underline underline-offset-4">Voornaam</button>
            <button @click="sortUsers('lastName', sortAscending)" class="w-56 font-extrabold text-left underline underline-offset-4">Achternaam</button>
        </div>


        <div class="flex flex-col h-80 overflow-y-auto border-2 divide-y-2 mb-4">
            <UsersRowPopup v-for="user in users" :key="user.id" v-bind:user="user"
                @createLoanFromUser="$emit('showCopySelector', $event)">
            </UsersRowPopup>
        </div>

        <div>
            <PaginationBar v-bind:curPage="this.currentPage" v-bind:totalPages="totalPages"
                @changePage="changePageNumber($event)">

            </PaginationBar>

        </div>

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
    props: ['title'],
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