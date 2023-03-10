<template>
    <div class="MyBooks">

        <div class="flex flex-row flex-wrap justify-center">
            <BookCard 
            v-for="book in books" :key="book.id"
            v-bind:title="book.title" 
            v-bind:author="book.author" 
            v-bind:isbn="book.isbn">
            </BookCard>
        </div>

    </div>
  </template>

<script>
import axios from 'axios';
import BookCard from '@/components/BookCard.vue'

export default {
  name: 'MyBooksView',
  components: {
    BookCard
},
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    // this.books = getBooks();
    this.getBooks()
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
  },
}
</script>

