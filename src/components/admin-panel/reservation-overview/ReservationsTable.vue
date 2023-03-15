<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">All Reservations</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchReservations(0, $event)" @goBack="getStartState()" class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortReservations(0, 'date')" class="w-36 font-extrabold text-left ml-8">Start Date</button>
            <button @click="sortReservations(0, 'firstName')" class="w-36 font-extrabold text-left ml-8">First Name</button>
            <button @click="sortReservations(0, 'lastName')" class="w-36 font-extrabold text-left">Last Name</button>
            <button @click="sortReservations(0, 'bookTitle')" class="font-extrabold text-left">Book Title</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <ReservationRow v-for="reservation in reservations" :key="reservation.id" v-bind:reservation="reservation">
            </ReservationRow>
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
import ReservationRow from '@/components/admin-panel/reservation-overview/ReservationRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';

export default {
    name: 'ReservationView',
    components: {
        ReservationRow,
        SearchBar,
        PaginationBar
    },
    data() {
        return {
            reservations: [],
            placeholder: "...",
            searchTerm: '',
            lastDirection: { 'bookTitle': 'desc', 'firstName': 'desc', 'lastName': 'desc', 'date': 'desc' },
            currentPages: { 'getReservations': 0, 'searchReservations': 0, 'sortNonSearchReservations': 0, 'sortSearchReservations': 0 },
            currentFunction: 'getReservations',
            lastPropertyToSortBy: '',
            pageableSize: 10
        };
    },
    mounted() {
        this.getReservations(0);
    },
    methods: {

        getReservations(currentPageNumber) {
            this.currentFunction = 'getReservations';
            this.currentPages = { 'getReservations': this.currentPages['getReservations'], 'searchReservations': 0, 'sortNonSearchReservations': 0, 'sortSearchReservations': 0 }
            this.search = false;
            axios.get('http://localhost:8080/reservation/pageable/get/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.reservations = response.data;
                        this.searchTerm = '';
                        this.currentPages[this.currentFunction] = currentPageNumber;

                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        searchReservations(currentPageNumber, searchTerm) {
            this.currentFunction = 'searchReservations'
            if (this.searchTerm == searchTerm) {
                this.currentPages = { 'getReservations': 0, 'searchReservations': this.currentPages['searchReservations'], 'sortNonSearchReservations': 0, 'sortSearchReservations': 0 }
            }
            console.log('used')
            axios.get('http://localhost:8080/reservation/pageable/search/' + searchTerm + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.reservations = response.data;
                        this.searchTerm = searchTerm;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortReservations(currentPageNumber, propertyToSortBy) {
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
                this.sortNonSearchReservations(currentPageNumber, propertyToSortBy, directionOfSort)
            }
            else {
                this.sortSearchReservations(currentPageNumber, propertyToSortBy, directionOfSort)
            }
        },

        sortNonSearchReservations(currentPageNumber, propertyToSortBy, directionOfSort) {
            this.currentFunction = 'sortNonSearchReservations'
            this.currentPages = { 'getReservations': 0, 'searchReservations': 0, 'sortNonSearchReservations': this.currentPages['sortNonSearchReservations'], 'sortSearchReservations': 0 }
            axios.get('http://localhost:8080/reservation/pageable/search/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.reservations = response.data;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortSearchReservations(currentPageNumber, propertyToSortBy, directionOfSort) {
            this.currentFunction = 'sortSearchReservations'
            this.currentPages = { 'getReservations': 0, 'searchReservations': 0, 'sortNonSearchReservations': 0, 'sortSearchReservations': this.currentPages['sortSearchReservations'] }
            axios.get('http://localhost:8080/reservation/pageable/search/' + this.searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.reservations = response.data;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPages[this.currentFunction] + change
            if (this.currentFunction == 'getReservations' && tempPageNumber >= 0) {
                this.getReservations(tempPageNumber)
            }
            if (this.currentFunction == 'searchReservations' && tempPageNumber >= 0) {
                this.searchReservations(tempPageNumber, this.searchTerm)
            }
            if (this.currentFunction == 'sortNonSearchReservations' && tempPageNumber >= 0) {
                this.sortNonSearchReservations(tempPageNumber, this.lastPropertyToSortBy, this.lastDirection[this.lastPropertyToSortBy])
            }
            if (this.currentFunction == 'sortSearchReservations' && tempPageNumber >= 0) {
                this.sortSearchReservations(tempPageNumber, this.lastPropertyToSortBy, this.lastDirection[this.lastPropertyToSortBy])
            }
        },

        
        getStartState() {
            this.searchTerm= '',
            this.lastDirection= { 'bookTitle': 'desc', 'firstName': 'desc', 'lastName': 'desc', 'date': 'desc' },
            this.currentPages= { 'getReservations': 0, 'searchReservations': 0, 'sortNonSearchReservations': 0, 'sortSearchReservations': 0 },
            this.currentFunction= 'getReservations',
            this.lastPropertyToSortBy= '',
            this.getReservations(0)
        },

    },
}
</script>