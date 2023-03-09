<template>
    <div class="MyBooks">
        <JimTest></JimTest>
        <PostTest></PostTest>
        <!-- <DeleteTest></DeleteTest> -->

        <div>
            <h1 class="font-bold">Book List Delete</h1>
            <ul>
                <li v-for="book in books" :key="book.id">
                {{ book.title }} by {{ book.author }}
                - {{ book.id }} - {{ book.isbn }}
                <button class="bg-black text-slate-50" 
                @click="deleteBook(book.id)">Delete</button>
                </li>
            </ul>
         </div>


         

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
import JimTest from '@/components/lelijke-htmls/JimTest.vue';
import PostTest from '@/components/lelijke-htmls/PostTest.vue';
import BookCard from '@/components/BookCard.vue'
// import DeleteTest from '@/components/lelijke-htmls/DeleteTest.vue';


// // Assume we have a book object with an id, title, and author property
// let book = { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" };

// Make the PUT request to update the book with the new data
// axios.put('http://localhost:8080/book/' + book.id, book)
//   .then(response => {
//     // Handle the response
//     console.log(response.data);
//   })
//   .catch(error => {
//     // Handle the error
//     console.log(error);
//   });


export default {
    name: 'MyBooksView',
    components: {
    JimTest,
    BookCard,
    PostTest,
    // DeleteTest
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
      deleteBook(id) {
        console.log(id)

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
      updateBook(id) {
        axios.put(`http://localhost:8080/book/${id}`)
            .then(response => {
                // Handle the response
                console.log(response.data);
            })
            .catch(error => {
                // Handle the error
                console.log(error);
            });
      }
    },
}
</script>

