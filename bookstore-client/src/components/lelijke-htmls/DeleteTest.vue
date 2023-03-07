<template>
    <div>
      <h1 class="font-bold">Book List Delete</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.title }} by {{ book.author }}
          - 
          <button class="bg-black text-slate-50" 
          @click="deleteBook(book.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'BookList',
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
      deleteBook(id) {
        axios.delete(`http://localhost:8080/book/${id}`)
          .then(response => {
            console.log('Book deleted:', response.data);
            // Remove the deleted book from the books array
            this.books = this.books.filter(book => book.id !== id);
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
  };
  </script>
  