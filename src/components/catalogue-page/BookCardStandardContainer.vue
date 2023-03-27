<template>
    <div class="Catalogue">
        <div class="flex flex-row flex-wrap justify-center">
        <!-- <div class="mx-40 my-5 grid grid-cols-4 grid-rows-3 gap-4"> -->
            <BookCardCatalogue v-for="book in books" :key="book.id" 
                v-bind:id="book.id" 
                v-bind:title="book.title" 
                v-bind:author="book.author"
                v-bind:isbn="book.isbn"
                class="w-1/5">
            </BookCardCatalogue>
        </div>
        <PaginationBar v-bind:curPage="currentPage" v-bind:totalPages="totalPages" @changePage="changePageNumber($event)">
        </PaginationBar>

    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import BookCardCatalogue from '@/components/catalogue-page/BookCardCatalogue.vue'
import PaginationBar from '@/components/reusable-components/PaginationBar.vue'

export default {
    name: 'CatalogueView',
    components: {
        BookCardCatalogue,
        PaginationBar
    },
    data() {
        return {
            books: [],
            currentPage: 0,
            totalPages: -1
        };
    },
    mounted() {
        this.getBooks(0);
    },
    methods: {
        getBooks(pageNumber) {
            let parameterDto = {}
            parameterDto.searchTerm = "";
            parameterDto.propertyToSortBy = "title"
            parameterDto.directionOfSort = "asc";
            parameterDto.pageNumber = pageNumber
            parameterDto.numberPerPage = 16
            parameterDto.archived = false

            axios.post("http://localhost:8080/book/searchEndPoint", parameterDto)
                .then(response => {
                    this.books = response.data.content;
                    this.currentPage = pageNumber
                    this.totalPages = response.data.totalPages
                })
                .catch(error => {
                    console.log(error);
                });
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPage + change
            if (tempPageNumber >= 0 && tempPageNumber <= (this.totalPages - 1)) {
                this.getBooks(tempPageNumber)
            }
        }
    }
}
</script>