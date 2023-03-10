<template>
    <div class="Catalogue">
        <!--<div class="flex flex-row flex-wrap justify-center">-->
          <div class="mx-40 my-5 grid grid-cols-5 gap-2">
            <BookCardCatalogue
            v-for="book in books" :key="book.id"
            v-bind:title="book.title" 
            v-bind:author="book.author"
            v-bind:isbn="book.isbn">
            </BookCardCatalogue>
          </div>
      <PaginationBar 
      v-bind:curPage="currentPage"    
      @changePage="changePageNumber($event)">
      </PaginationBar>

    </div>
  </template>

<script>
// @ is an alias to /src
import axios from 'axios';
import BookCardCatalogue from '@/components/BookCardCatalogue.vue'
import PaginationBar from '@/components/PaginationBar.vue'

export default {
  name: 'CatalogueView',
  components: {
    BookCardCatalogue,
    PaginationBar
},
  data() {
    return {
      books: [],
      currentPage: 0,
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      axios.get('http://localhost:8080/bookPage/'+this.currentPage+'/15')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    changePageNumber(change) {
         this.currentPage += change;
         this.getBooks(); 
      }
      
    }
  }
</script>