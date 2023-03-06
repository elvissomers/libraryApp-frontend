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
                - {{ book.id }}
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
    },
}
</script>

