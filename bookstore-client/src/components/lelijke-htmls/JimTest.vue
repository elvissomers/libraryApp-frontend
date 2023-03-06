<template>
    <div>
      <ul>
        <li v-for="book in books" :key="book.id">
            {{ book.author }} - {{ book.title }}
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
    },
  };
  </script>
  