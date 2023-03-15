<template>
    <div class="Catalogue">
        <!--<div class="flex flex-row flex-wrap justify-center">-->
        <div class="mx-40 my-5 grid grid-cols-4 grid-rows-3 gap-4">
            <BookCardCatalogue v-for="book in books" :key="book.id" 
                v-bind:id="book.id" 
                v-bind:title="book.title" 
                v-bind:author="book.author"
                v-bind:isbn="book.isbn">
            </BookCardCatalogue>
        </div>
        <PaginationBar v-bind:curPage="currentPage" @changePage="changePageNumber($event)">
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
        };
    },
    mounted() {
        this.getBooks(0);
    },
    methods: {
        getBooks(pageNumber) {
            axios.get('http://localhost:8080/book/pageable/get/' + pageNumber + '/16')
                .then(response => {
                    if (response.data.length > 0) {
                        this.books = response.data;
                        this.currentPage = pageNumber
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        changePageNumber(change) {
            const tempPage = this.currentPage + change;
            if (this.currentPage >= 0) {
                this.getBooks(tempPage)
            }
        }
    }
}
</script>