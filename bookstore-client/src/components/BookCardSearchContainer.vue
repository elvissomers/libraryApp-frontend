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
  name: 'BookCardSearchContainer',  
  components: {
    BookCardCatalogue,
    PaginationBar},

  props: ['searchTerm'],

  watch: {
    searchTerm: function() {
        this.currentPage = 0
        this.searchBooks()
    }
  },

  data() {
    return {
      books: [],
      currentPage: 0,
      previousPage: 0,
      startOver: this.startAgain
    };
  },

  mounted() {
    this.searchBooks();
  },



  methods: {
    
    searchBooks() { 

      axios.get('http://localhost:8080/booksearch/'+this.searchTerm+'/'+this.currentPage+'/5')
        .then(response => {  
          if (response.data.length > 0) {
            this.books = response.data;
          }
          else {
            this.currentPage = this.previousPage
          }  
        })
        .catch(error => {
          console.log(error);
        });
    },

    changePageNumber(change) {
        this.previousPage = this.currentPage
        this.currentPage += change;
        if (this.currentPage >= 0) {
            this.searchBooks()
        }
        else {
            this.currentPage = this.previousPage
        }
      } 
  }
      
}
</script>