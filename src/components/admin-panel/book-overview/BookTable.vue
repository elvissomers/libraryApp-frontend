<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <router-link :to="{ name: 'add-book' }">
                <button class="text-white float-right px-4 py-2 m-2 h-fit rounded-md bg-blue-500">Boek Toevoegen</button>
            </router-link>
            <div class="p-4 text-center rounded-md">Alle Boeken</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchBooks(0, $event, 'title', 'asc')" @goBack="searchBooks(0, '', 'title', 'asc')"
                class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortBooks('isbn', sortAscending)" class="w-36 font-extrabold text-left ml-8">ISBN</button>
            <button @click="sortBooks('author', sortAscending)" class="w-56 font-extrabold text-left">Auteur</button>
            <button @click="sortBooks('title', sortAscending)" class="font-extrabold text-left">Titel</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <BookRow v-for="book in books" :key="book.id" v-bind:book="book">
            </BookRow>
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
import BookRow from '@/components/admin-panel/book-overview/BookRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';

export default {
    name: 'BookView',
    components: {
        BookRow,
        SearchBar,
        PaginationBar
    },
    data() {
        return {
            books: [],
            placeholder: "Auteur, Titel, ISBN...",
            searchTerm: '',
            sortAscending: true,
            currentPage: 0,
            propertyToSortBy: 'title',
            pageableSize: 10,
            archived: false
        };
    },
    mounted() {
        this.searchBooks(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchBooks(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            console.log
            const directionOfSort = sortAscending ? "asc" : "desc";
            let url = ''
            if (searchTerm == '') {
                url = 'http://localhost:8080/book/pageable/search/'+ propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
            }
            else {
                url = 'http://localhost:8080/book/pageable/search/'+ searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize
            }

            axios.get(url)
                    .then(response => {
                        if (response.data.length > 0) {
                            console.log(response)
                            this.books = response.data;
                            this.searchTerm = searchTerm;
                            this.currentPage = currentPageNumber;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },

        sortBooks(propertyToSortBy) {
            this.currentPage = 0;
            if (propertyToSortBy != this.propertyToSortBy) {
                this.sortAscending = true;
                this.propertyToSortBy = propertyToSortBy;
            }
            else {
                this.sortAscending = !this.sortAscending
            }
            console.log(this.sortAscending)
            this.searchBooks(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPage + change
            if (tempPageNumber >= 0) {
                console.log(this.sortAscending)
                this.searchBooks(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.sortAscending)
            }
        },


    },
}
</script>