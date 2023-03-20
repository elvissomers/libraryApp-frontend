<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">Alle reserveringen van dit boek</div>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button class="w-36 font-extrabold text-left ml-8">Datum</button>
            <button class="w-36 font-extrabold text-left">Voornaam</button>
            <button class="w-36 font-extrabold text-left">Achternaam</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <BookReservationRow v-for="reservation in reservations" :key="reservation.id" v-bind:reservation="reservation">
            </BookReservationRow>
        </div>

        <div>
            <!-- <PaginationBar v-bind:curPage="this.currentPage" @changePage="changePageNumber($event)">

            </PaginationBar> -->

        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import BookReservationRow from '@/components/details/book-detail-page/BookReservationRow.vue';

export default {
    name: 'ReservationView',
    components: {
        BookReservationRow
    },
    data() {
        return {
            reservations: []
            // placeholder: "Naam of Titel",
            // searchTerm: '',
            // sortAscending: true,
            // currentPage: 0,
            // propertyToSortBy: 'date',
            // pageableSize: 10
        };
    },
    mounted() {
        this.searchReservations();
    },
    methods: {

        searchReservations(){
            axios.get("http://localhost:8080/book/reservations/" + this.$route.params.id)
                .then(response => {
                    this.reservations = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
            }
        

        // searchReservations(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
        //     const directionOfSort = sortAscending ? "asc" : "desc";
        //     let url = ''
        //     if (searchTerm == '') {
        //         url = 'http://localhost:8080/reservation/pageable/search/'+ propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
        //     }
        //     else {
        //         url = 'http://localhost:8080/reservation/pageable/search/'+ searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
        //     }

        //     axios.get(url)
        //             .then(response => {
        //                 if (response.data.length > 0) {
        //                     this.reservations = response.data;
        //                     this.searchTerm = searchTerm;
        //                     this.currentPage = currentPageNumber;
        //                 }
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        // },

        // sortReservations(propertyToSortBy) {
        //     this.currentPage = 0;
        //     if (propertyToSortBy != this.propertyToSortBy) {
        //         this.sortAscending = true;
        //         this.propertyToSortBy = propertyToSortBy;
        //     }
        //     else {
        //         this.sortAscending = !this.sortAscending
        //     }
        //     this.searchReservations(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        // },

        // changePageNumber(change) {
        //     const tempPageNumber = this.currentPage + change
        //     if (tempPageNumber >= 0) {
        //         this.searchReservations(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.directionOfSort)
        //     }
        // },


    }
}
</script>