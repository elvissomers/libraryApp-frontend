<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">Alle Uitleningen van dit boek</div>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button class="w-36 font-extrabold text-left ml-8">Datum</button>
            <button class="w-36 font-extrabold text-left">Voor Naam</button>
            <button class="w-36 font-extrabold text-left">Achter Naam</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <BookLoanRow v-for="loan in loans" :key="loan.id" v-bind:loan="loan">
            </BookLoanRow>
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
import BookLoanRow from '@/components/details/book-detail-page/BookLoanRow.vue';

export default {
    name: 'LoanView',
    components: {
        BookLoanRow
    },
    data() {
        return {
            loans: [],
            // placeholder: "Naam of Titel",
            // searchTerm: '',
            // sortAscending: true,
            // currentPage: 0,
            // propertyToSortBy: 'startDate',
            // pageableSize: 10
        };
    },
    mounted() {
        this.searchLoans();
    },
    methods: {

        searchLoans(){
            axios.get("http://localhost:8080/book/loans/" + this.$route.params.id)
                .then(response => {
                    this.loans = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },

        // searchLoans(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
        //     const directionOfSort = sortAscending ? "asc" : "desc";
        //     let url = ''
        //     if (searchTerm == '') {
        //         url = 'http://localhost:8080/loan/pageable/search/'+ propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
        //     }
        //     else {
        //         url = 'http://localhost:8080/loan/pageable/search/'+ searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
        //     }

        //     axios.get(url)
        //             .then(response => {
        //                 if (response.data.length > 0) {
        //                     this.loans = response.data;
        //                     this.searchTerm = searchTerm;
        //                     this.currentPage = currentPageNumber;
        //                 }
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        // },

        // sortLoans(propertyToSortBy) {
        //     this.currentPage = 0;
        //     if (propertyToSortBy != this.propertyToSortBy) {
        //         this.sortAscending = true;
        //         this.propertyToSortBy = propertyToSortBy;
        //     }
        //     else {
        //         this.sortAscending = !this.sortAscending
        //     }
        //     this.searchLoans(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        // }

        // changePageNumber(change) {
        //     const tempPageNumber = this.currentPage + change
        //     if (tempPageNumber >= 0) {
        //         this.searchLoans(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.directionOfSort)
        //     }
        // },


    }


</script>