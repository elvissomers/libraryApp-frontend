<template>
    <div>
      <h1>Add a Book</h1>
      <form @submit.prevent="createBook">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="book.title">
        <label for="author">Author:</label>
        <input type="text" id="author" v-model="book.author">
        <button class="border-slate-900 outline-2 bg-yellow-500" type="submit">Create Book</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AddBook',
    data() {
      return {
        book: {
          title: '',
          author: '',
        },
      };
    },
    methods: {
        
      createBook() {
        axios.post('http://localhost:8080/book/create', this.book)
          .then(response => {
            console.log('Book created:', response.data);
          })
          .catch(error => {
            console.log(error);
          })
          .then(() => this.getBooks());
      },
    },
  };
  </script>