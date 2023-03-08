<template>
    <div>
      <h1>Add a Book</h1>
      <form @submit.prevent="createBook">
        <label for="title">Title:</label>
        <input class="bg-slate-200" type="text" id="title" v-model="book.title">
        <label for="author">Author:</label>
        <input class="bg-slate-200" type="text" id="author" v-model="book.author">
        <label for="author">isbn:</label>
        <input class="bg-slate-200" type="text" id="author" v-model="book.isbn">
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
          isbn: '',
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