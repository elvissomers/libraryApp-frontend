<template>
    <div class="flex flex-col w-full">

        <h4 class="text-xl text-gray-900 font-bold mb-4 pb-2 border-b">Alle actieve reserveringen van deze gebruiker</h4>


        <div class="flex flex-row py-4 border-b-2">
            <button class="w-48 font-extrabold text-left ml-8">Datum</button>
            <button class="w-48 font-extrabold text-left">Titel</button>
        </div>


        <div class="flex flex-col divide-y-2 max-h-96 overflow-y-auto">
            <UserReservationRow v-for="reservation in reservations" :key="reservation.id" v-bind:reservation="reservation">
            </UserReservationRow>
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
import UserReservationRow from '@/components/details/user-detail-page/UserReservationRow.vue';

export default {
    name: 'UserReservationTable',
    components: {
        UserReservationRow
    },
    data() {
        return {
            reservations: [],
        };
    },
    mounted() {
        this.searchReservations();
    },
    methods: {

        searchReservations() {
            axios.get("http://localhost:8080/user/reservations/" + this.$route.params.id)
                .then(response => {
                    this.reservations = response.data;
                    console.log(this.reservations)
                })
                .catch(error => {
                    console.log(error)
                })
        },


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