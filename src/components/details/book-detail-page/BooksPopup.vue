<template>
    <div class="flex flex-col w-fit bg-slate-300 p-8 rounded-3xl">

        <div class="w-full">
        <button v-on:click="this.$emit('closeCopyPopup')" type="button" class="float-right">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-xl p-8">
            <h3 class="text-lg font-bold mb-4">Book Popup</h3>
            <p>This is where you would add the form to book something.</p>
            <button class="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded" @click="$emit('close')">Close</button>
            </div>
        </div>
    </div>

        <div class="p-4 text-center rounded-md">Alle Exemplaren</div>
        <div class="content-center flex flex-row justify-between">
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button @click="sortReservations('number', sortAscending)" class="w-36 font-extrabold text-left ml-8">Exemplaar nummer</button>
        </div>


        <div class="flex flex-col h-80 overflow-y-auto">
            <BookRowPopup v-for="book in books" :key="book.isbn" v-bind:book="book"></BookRowPopup>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import BookRowPopup from '@/components/details/book-detail-page/BooksRowPopup.vue';

export default {
    name: 'BookPopup',
    components: {
        BookRowPopup,
    },

    data() {
        return {
            books: [],

        };
    },
    mounted() {
        this.searchBooks();
    },
    methods: {

        searchBooks() {
            axios.get('http://localhost:8080/book/get')
            .then(response => {
                if (response.data.length > 0) {
                    this.books = response.data;
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
    },
}
</script>