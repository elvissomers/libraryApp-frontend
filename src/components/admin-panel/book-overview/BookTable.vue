<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">All Books</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchBooks($event)" @goBack="getBooks()" class="m-2"></SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <div class="w-12 ml-8 font-extrabold">Id</div>
            <div class="w-36 font-extrabold">ISBN</div>
            <div class="w-56 font-extrabold">Author</div>
            <div class="font-extrabold">Title</div>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <BookRow v-for="book in books" :key="book.id" v-bind:book="book">
            </BookRow>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import BookRow from '@/components/admin-panel/book-overview/BookRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';

export default {
    name: 'BookView',
    components: {
        BookRow,
        SearchBar
    },
    data() {
        return {
            books: [],
            placeholder: "Auteur, Title, ISBN..."
        };
    },
    mounted() {
        this.getBooks();
    },
    methods: {
        getBooks() {
            axios.get('http://localhost:8080/book')
                .then(response => {
                    this.books = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        searchBooks(searchTerm) {
            axios.get('http://localhost:8080/booksearch/'+searchTerm+'/0/50')
                .then(response => {
                    this.books = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

    },
}
</script>