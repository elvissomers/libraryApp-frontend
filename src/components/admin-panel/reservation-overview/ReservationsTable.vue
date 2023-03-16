<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">All Reservations</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchReservations(0, $event)" @goBack="getStartState()"
                class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortReservations('date', sortAscending)" class="w-36 font-extrabold text-left ml-8">Date</button>
            <button @click="sortReservations('user_FirstName', sortAscending)" class="w-36 font-extrabold text-left">First Name</button>
            <button @click="sortReservations('user_LastName', sortAscending)" class="w-36 font-extrabold text-left">Last Name</button>
            <button @click="sortReservations('book_Title', sortAscending)" class="font-extrabold text-left">Book Title</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <ReservationRow v-for="reservation in reservations" :key="reservation.id" v-bind:reservation="reservation">
            </ReservationRow>
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
            placeholder: "First Name, Last Name, Title",
            searchTerm: '',
            sortAscending: true,
            currentPage: 0,
            propertyToSortBy: 'date',
            pageableSize: 10
        };
    },
    mounted() {
        this.searchReservations(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchReservations(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            const directionOfSort = sortAscending ? "asc" : "desc";
            let url = ''
            if (searchTerm == '') {
                url = 'http://localhost:8080/reservation/pageable/search/'+ propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
            }
            else {
                url = 'http://localhost:8080/reservation/pageable/search/'+ searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
            }

            axios.get(url)
                    .then(response => {
                        if (response.data.length > 0) {
                            this.reservations = response.data;
                            this.searchTerm = searchTerm;
                            this.currentPage = currentPageNumber;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },

        sortReservations(propertyToSortBy) {
            this.currentPage = 0;
            if (propertyToSortBy != this.propertyToSortBy) {
                this.sortAscending = true;
                this.propertyToSortBy = propertyToSortBy;
            }
            else {
                this.sortAscending = !this.sortAscending
            }
            this.searchReservations(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPage + change
            if (tempPageNumber >= 0) {
                this.searchReservations(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.directionOfSort)
            }
        },


    },
}
</script>