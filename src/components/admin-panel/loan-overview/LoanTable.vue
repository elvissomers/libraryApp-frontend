<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <router-link :to="{ name: 'create-loan' }">
                <button class="text-white float-right px-4 py-2 m-2 h-fit rounded-md bg-blue-500">Loan Toevoegen</button>
            </router-link>
            <div class="p-4 text-center rounded-md">All Loans</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchLoans(0, $event)" @goBack="getStartState()" class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortLoans(0, 'startDate')" class="w-36 font-extrabold text-left ml-8">Start Date</button>
            <button @click="sortLoans(0, 'firstName')" class="w-36 font-extrabold text-left">First Name</button>
            <button @click="sortLoans(0, 'lastName')" class="w-36 font-extrabold text-left">Last Name</button>
            <button @click="sortLoans(0, 'bookTitle')" class="font-extrabold text-left">Book Title</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <LoanRow v-for="loan in loans" :key="loan.id" v-bind:loan="loan">
            </LoanRow>
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
            placeholder: "...",
            searchTerm: '',
            lastDirection: { 'bookTitle': 'desc', 'firstName': 'desc', 'lastName': 'desc', 'startDate': 'desc' },
            currentPages: { 'getLoans': 0, 'searchLoans': 0, 'sortNonSearchLoans': 0, 'sortSearchLoans': 0 },
            currentFunction: 'getLoans',
            lastPropertyToSortBy: '',
            pageableSize: 10
        };
    },
    mounted() {
        this.getLoans(0);
    },
    methods: {

        getLoans(currentPageNumber) {
            this.currentFunction = 'getLoans';
            this.currentPages = { 'getLoans': this.currentPages['getLoans'], 'searchLoans': 0, 'sortNonSearchLoans': 0, 'sortSearchLoans': 0 }
            this.search = false;
            axios.get('http://localhost:8080/loan/pageable/get/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.loans = response.data;
                        this.searchTerm = '';
                        this.currentPages[this.currentFunction] = currentPageNumber;

                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        searchLoans(currentPageNumber, searchTerm) {
            this.currentFunction = 'searchLoans'
            if (this.searchTerm == searchTerm) {
                this.currentPages = { 'getLoans': 0, 'searchLoans': this.currentPages['searchLoans'], 'sortNonSearchLoans': 0, 'sortSearchLoans': 0 }
            }
            console.log('used')
            axios.get('http://localhost:8080/loan/pageable/search/' + searchTerm + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.loans = response.data;
                        this.searchTerm = searchTerm;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortLoans(currentPageNumber, propertyToSortBy) {
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
                this.sortNonSearchLoans(currentPageNumber, propertyToSortBy, directionOfSort)
            }
            else {
                this.sortSearchLoans(currentPageNumber, propertyToSortBy, directionOfSort)
            }
        },

        sortNonSearchLoans(currentPageNumber, propertyToSortBy, directionOfSort) {
            this.currentFunction = 'sortNonSearchLoans'
            this.currentPages = { 'getLoans': 0, 'searchLoans': 0, 'sortNonSearchLoans': this.currentPages['sortNonSearchLoans'], 'sortSearchLoans': 0 }
            axios.get('http://localhost:8080/loan/pageable/search/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.loans = response.data;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortSearchLoans(currentPageNumber, propertyToSortBy, directionOfSort) {
            this.currentFunction = 'sortSearchLoans'
            this.currentPages = { 'getLoans': 0, 'searchLoans': 0, 'sortNonSearchLoans': 0, 'sortSearchLoans': this.currentPages['sortSearchLoans'] }
            axios.get('http://localhost:8080/loan/pageable/search/' + this.searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.loans = response.data;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPages[this.currentFunction] + change
            if (this.currentFunction == 'getLoans' && tempPageNumber >= 0) {
                this.getLoans(tempPageNumber)
            }
            if (this.currentFunction == 'searchLoans' && tempPageNumber >= 0) {
                this.searchLoans(tempPageNumber, this.searchTerm)
            }
            if (this.currentFunction == 'sortNonSearchLoans' && tempPageNumber >= 0) {
                this.sortNonSearchLoans(tempPageNumber, this.lastPropertyToSortBy, this.lastDirection[this.lastPropertyToSortBy])
            }
            if (this.currentFunction == 'sortSearchLoans' && tempPageNumber >= 0) {
                this.sortSearchLoans(tempPageNumber, this.lastPropertyToSortBy, this.lastDirection[this.lastPropertyToSortBy])
            }
        },

        
        getStartState() {
            this.searchTerm= '',
            this.lastDirection= { 'bookTitle': 'desc', 'firstName': 'desc', 'lastName': 'desc', 'startDate': 'desc' },
            this.currentPages= { 'getLoans': 0, 'searchLoans': 0, 'sortNonSearchLoans': 0, 'sortSearchLoans': 0 },
            this.currentFunction= 'getLoans',
            this.lastPropertyToSortBy= '',
            this.getLoans(0)
        },

    },
}
</script>