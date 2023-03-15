<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <router-link :to="{ name: 'add-book' }">
                <button class="text-white float-right px-4 py-2 m-2 h-fit rounded-md bg-blue-500">Boek Toevoegen</button>
            </router-link>
            <div class="p-4 text-center rounded-md">All Books</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchBooks(0, $event)" @goBack="getStartState()"
                class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortBooks(0, 'isbn')" class="w-36 font-extrabold text-left ml-8">ISBN</button>
            <button @click="sortBooks(0, 'author')" class="w-56 font-extrabold text-left">Author</button>
            <button @click="sortBooks(0, 'title')" class="font-extrabold text-left">Title</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <BookRow v-for="book in books" :key="book.id" v-bind:book="book">
            </BookRow>
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
            placeholder: "Auteur, Title, ISBN...",
            searchTerm: '',
            lastDirection: { 'title': 'desc', 'isbn': 'desc', 'author': 'desc' },
            currentPages: { 'getBooks': 0, 'searchBooks': 0, 'sortNonSearchBooks': 0, 'sortSearchBooks': 0 },
            currentFunction: 'getBooks',
            lastPropertyToSortBy: '',
            pageableSize: 10
        };
    },
    mounted() {
        this.getBooks(0);
    },
    methods: {

        getBooks(currentPageNumber) {
            this.currentFunction = 'getBooks';
            this.currentPages = { 'getBooks': this.currentPages['getBooks'], 'searchBooks': 0, 'sortNonSearchBooks': 0, 'sortSearchBooks': 0 }
            this.search = false;
            axios.get('http://localhost:8080/book/pageable/get/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.books = response.data;
                        this.searchTerm = '';
                        this.currentPages[this.currentFunction] = currentPageNumber;

                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        searchBooks(currentPageNumber, searchTerm) {
            this.currentFunction = 'searchBooks'
            if (this.searchTerm == searchTerm) {
                this.currentPages = { 'getBooks': 0, 'searchBooks': this.currentPages['searchBooks'], 'sortNonSearchBooks': 0, 'sortSearchBooks': 0 }
            }
            console.log('used')
            axios.get('http://localhost:8080/book/pageable/search/' + searchTerm + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.books = response.data;
                        this.searchTerm = searchTerm;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortBooks(currentPageNumber, propertyToSortBy) {
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
                this.sortNonSearchBooks(currentPageNumber, propertyToSortBy, directionOfSort)
            }
            else {
                this.sortSearchBooks(currentPageNumber, propertyToSortBy, directionOfSort)
            }
        },

        sortNonSearchBooks(currentPageNumber, propertyToSortBy, directionOfSort) {
            this.currentFunction = 'sortNonSearchBooks'
            this.currentPages = { 'getBooks': 0, 'searchBooks': 0, 'sortNonSearchBooks': this.currentPages['sortNonSearchBooks'], 'sortSearchBooks': 0 }
            axios.get('http://localhost:8080/book/pageable/search/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.books = response.data;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortSearchBooks(currentPageNumber, propertyToSortBy, directionOfSort) {
            this.currentFunction = 'sortSearchBooks'
            this.currentPages = { 'getBooks': 0, 'searchBooks': 0, 'sortNonSearchBooks': 0, 'sortSearchBooks': this.currentPages['sortSearchBooks'] }
            axios.get('http://localhost:8080/book/pageable/search/' + this.searchTerm + '/' + propertyToSortBy + '/' + directionOfSort + '/' + currentPageNumber + '/' + this.pageableSize)
                .then(response => {
                    if (response.data.length > 0) {
                        this.books = response.data;
                        this.currentPages[this.currentFunction] = currentPageNumber;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPages[this.currentFunction] + change
            if (this.currentFunction == 'getBooks' && tempPageNumber >= 0) {
                this.getBooks(tempPageNumber)
            }
            if (this.currentFunction == 'searchBooks' && tempPageNumber >= 0) {
                this.searchBooks(tempPageNumber, this.searchTerm)
            }
            if (this.currentFunction == 'sortNonSearchBooks' && tempPageNumber >= 0) {
                this.sortNonSearchBooks(tempPageNumber, this.lastPropertyToSortBy, this.lastDirection[this.lastPropertyToSortBy])
            }
            if (this.currentFunction == 'sortSearchBooks' && tempPageNumber >= 0) {
                this.sortSearchBooks(tempPageNumber, this.lastPropertyToSortBy, this.lastDirection[this.lastPropertyToSortBy])
            }
        },


        getStartState() {
            this.searchTerm = '',
                this.lastDirection = { 'title': 'desc', 'isbn': 'desc', 'author': 'desc' },
                this.currentPages = { 'getBooks': 0, 'searchBooks': 0, 'sortNonSearchBooks': 0, 'sortSearchBooks': 0 },
                this.currentFunction = 'getBooks',
                this.lastPropertyToSortBy = '',
                this.getBooks(0)
        },

    },
}
</script>