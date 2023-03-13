

<template>
  <div class="EditBooks">
    <SideBar></SideBar>
    <!-- <div class="flex flex-row flex-wrap justify-center"> -->
      <BookRow 
      v-for="book in books" :key="book.id"
      v-bind:id="book.id"
      v-bind:title="book.title" 
      v-bind:author="book.author" 
      v-bind:isbn="book.isbn">
      </BookRow>
      
    <!-- </div> -->


    <EditBooks></EditBooks>

  </div>
</template>

<script>
// @ is an alias to /src
import EditBooks from '@/components/admin-panel/book-overview/EditBooks.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import axios from 'axios'
import BookRow from '@/components/admin-panel/book-overview/BookRow.vue';

export default {
  name: 'EditBooksView',
  components: {
    SideBar,
    EditBooks,
    BookRow
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

<style>
.EditBooks {
display: flex;
flex-wrap: nowrap;

}
</style>