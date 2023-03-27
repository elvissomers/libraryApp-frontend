<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between border-b-2 border-zinc-400">
            <router-link :to="{ name: 'create-loan-user' }">
                <button class="text-white float-right px-4 py-2 m-2 h-fit rounded-md bg-blue-500">Uitlening
                    Toevoegen</button>
            </router-link>
            <div class="p-4 text-center rounded-md font-bold text-lg">Alle Uitleningen</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchLoans(0, $event, 'startDate', 'asc')"
                @goBack="searchLoans(0, '', 'startDate', 'asc')" class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row justify-between border-b-2">
            <div class="flex flex-row py-4">
                <button @click="sortLoans('startDate', sortAscending)"
                    class="w-36 font-extrabold text-left ml-8">Uitleen Datum</button>
                    <button @click="sortLoans('endDate', sortAscending)"
                    class="w-36 font-extrabold text-left">Inlever Datum</button>
                <button @click="sortLoans('user.firstName', sortAscending)" class="w-36 font-extrabold text-left">Voor
                    Naam</button>
                <button @click="sortLoans('user.lastName', sortAscending)" class="w-36 font-extrabold text-left">Achter
                    Naam</button>
                <button @click="sortLoans('copy.book.title', sortAscending)" class="font-extrabold text-left">Boek
                    Titel</button>
            </div>
            <div class="flex flex-row">
                <span class="p-4">Laat Ingeleverde Boeken Zien</span>
                <div class="my-auto mx-2">
                    <ToggleButtonComponent @toggle="toggleOpen()"></ToggleButtonComponent>
                </div>
                <!-- <input type="checkbox" @click="toggleArchived()"> -->
            </div>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <LoanRow v-for="loan in loans" :key="loan.id" v-bind:loan="loan">
            </LoanRow>
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
import LoanRow from '@/components/admin-panel/loan-overview/LoanRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';
import ToggleButtonComponent from '@/components/reusable-components/ToggleButtonComponent.vue';

export default {
    name: 'LoanView',
    components: {
        LoanRow,
        SearchBar,
        PaginationBar,
        ToggleButtonComponent
    },
    data() {
        return {
            loans: [],
            placeholder: "Naam of Titel",
            searchTerm: '',
            sortAscending: true,
            currentPage: 0,
            propertyToSortBy: 'startDate',
            pageableSize: 10,
            showClosed: true,
            totalPages: -1 
        };
    },
    mounted() {
        this.searchLoans(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchLoans(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            let parameterDto = {}
            parameterDto.searchTerm = searchTerm;
            parameterDto.propertyToSortBy = propertyToSortBy
            parameterDto.directionOfSort = sortAscending ? "asc" : "desc";
            parameterDto.pageNumber = currentPageNumber
            parameterDto.numberPerPage = this.pageableSize
            parameterDto.open = this.showClosed

            axios.post("http://localhost:8080/loan/searchEndPoint", parameterDto)
                .then(response => {
                    this.loans = response.data.content;
                    this.totalPages = response.data.totalPages;
                    this.currentPage = currentPageNumber
                    this.searchTerm = searchTerm;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortLoans(propertyToSortBy) {
            this.currentPage = 0;
            if (propertyToSortBy != this.propertyToSortBy) {
                this.sortAscending = true;
                this.propertyToSortBy = propertyToSortBy;
            }
            else {
                this.sortAscending = !this.sortAscending
            }
            this.searchLoans(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPage + change
            if (tempPageNumber >= 0 && tempPageNumber <= (this.totalPages - 1)) {
                this.searchLoans(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.sortAscending)
            }
        },

        toggleOpen() {
            this.showClosed = !this.showClosed
            this.searchLoans(0, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        }

    },
}
</script>