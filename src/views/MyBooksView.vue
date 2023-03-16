<template>
    <div class="MyBooks">

        <div class="flex flex-row flex-wrap justify-center">
            <MyBookCard 
              v-for="book in books" :key="book.id"
              v-bind:id="book.id" 
              v-bind:title="book.title" 
              v-bind:author="book.author" 
              v-bind:isbn="book.isbn">
            </MyBookCard>
        </div>

    </div>
  </template>

<script>
import axios from 'axios';
import MyBookCard from '@/components/my-book-page/MyBookCard.vue'

export default {
  name: 'MyBooksView',
  components: {
    MyBookCard
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
      axios.get('http://localhost:8080/book/get')
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

