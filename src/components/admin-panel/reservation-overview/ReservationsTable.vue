<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between border-b-2 border-zinc-400">
            <div></div>
            <div class="p-4 text-center rounded-md font-bold text-lg">Alle Reserveringen</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchReservations(0, $event, 'date', 'asc')"
                @goBack="searchReservations(0, '', 'date', 'asc')" class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortReservations('date', sortAscending)" class="w-36 font-extrabold text-left ml-8">Datum</button>
            <button @click="sortReservations('user.firstName', sortAscending)" class="w-36 font-extrabold text-left">Voornaam</button>
            <button @click="sortReservations('user.lastName', sortAscending)" class="w-36 font-extrabold text-left">Achternaam</button>
            <button @click="sortReservations('book.title', sortAscending)" class="font-extrabold text-left">Boektitel</button>
        </div>

        <div class="flex flex-col flex-wrap divide-y-2">
            <ReservationRow v-for="reservation in reservations" :key="reservation.id" v-bind:reservation="reservation">
            </ReservationRow>
        </div>

        <div>
            <PaginationBar v-bind:curPage="this.currentPage" v-bind:totalPages="this.totalPages"
                @changePage="changePageNumber($event)">

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
            placeholder: "Naam of Titel",
            searchTerm: '',
            sortAscending: true,
            currentPage: 0,
            propertyToSortBy: 'date',
            pageableSize: 10,
            totalPages: -1
        };
    },
    mounted() {
        this.searchReservations(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchReservations(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            let parameterDto = {}
            parameterDto.searchTerm = searchTerm;
            parameterDto.propertyToSortBy = propertyToSortBy
            parameterDto.directionOfSort = sortAscending ? "asc" : "desc";
            parameterDto.pageNumber = currentPageNumber
            parameterDto.numberPerPage = this.pageableSize

            axios.post("http://localhost:8080/reservation/searchEndPoint", parameterDto)
                .then(response => {
                    this.reservations = response.data.content;
                    this.totalPages = response.data.totalPages;
                    this.currentPage = currentPageNumber;
                    this.searchTerm = searchTerm;
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
            if (tempPageNumber >= 0 && tempPageNumber <= (this.totalPages - 1)) {
                this.searchReservations(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.sortAscending)
            }
        },


    },
}
</script>