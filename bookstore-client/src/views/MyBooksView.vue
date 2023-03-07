<template>
    <div class="MyBooks">

        <div class="flex flex-row">
            <BookCard 
            v-for="book in books" :key="book.id"
            v-bind:title="book.title"
            v-bind:author="book.author">
            </BookCard>
        </div>

    </div>
  </template>

<script>
// @ is an alias to /src
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
  },
}
</script>

