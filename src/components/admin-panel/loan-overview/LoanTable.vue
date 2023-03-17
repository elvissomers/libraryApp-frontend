<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <router-link :to="{ name: 'create-loan-user' }">
                <button class="text-white float-right px-4 py-2 m-2 h-fit rounded-md bg-blue-500">Uitlening Toevoegen</button>
            </router-link>
            <div class="p-4 text-center rounded-md">Alle Uitleningen</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchLoans(0, $event)" @goBack="getStartState()"
                class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortLoans('startDate', sortAscending)" class="w-36 font-extrabold text-left ml-8">Datum</button>
            <button @click="sortLoans('user_FirstName', sortAscending)" class="w-36 font-extrabold text-left">Voor Naam</button>
            <button @click="sortLoans('user_LastName', sortAscending)" class="w-36 font-extrabold text-left">Achter Naam</button>
            <button @click="sortLoans('copy_Book_Title', sortAscending)" class="font-extrabold text-left">Boek Titel</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <LoanRow v-for="loan in loans" :key="loan.id" v-bind:loan="loan">
            </LoanRow>
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
import LoanRow from '@/components/admin-panel/loan-overview/LoanRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';

export default {
    name: 'LoanView',
    components: {
        LoanRow,
        SearchBar,
        PaginationBar
    },
    data() {
        return {
            loans: [],
            placeholder: "Naam of Titel",
            searchTerm: '',
            sortAscending: true,
            currentPage: 0,
            propertyToSortBy: 'startDate',
            pageableSize: 10
        };
    },
    mounted() {
        this.searchLoans(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchLoans(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            const directionOfSort = sortAscending ? "asc" : "desc";
            let url = ''
            if (searchTerm == '') {
                url = 'http://localhost:8080/loan/pageable/search/'+ propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
            }
            else {
                url = 'http://localhost:8080/loan/pageable/search/'+ searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
            }

            axios.get(url)
                    .then(response => {
                        if (response.data.length > 0) {
                            this.loans = response.data;
                            this.searchTerm = searchTerm;
                            this.currentPage = currentPageNumber;
                        }
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
            if (tempPageNumber >= 0) {
                this.searchLoans(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.directionOfSort)
            }
        },


    },
}
</script>