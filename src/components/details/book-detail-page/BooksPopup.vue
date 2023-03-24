<template>
  <div class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">

  <div class="flex flex-col w-2/5 h-3/4 bg-white p-8 rounded-3xl fixed top-8 border-8 border-green-600">

      <div class="w-full">
          <button v-on:click="this.$emit('closeBooksPopup')" type="button" class="float-right">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
      </div>

      <div class="p-4 text-center rounded-md underline underline-offset-8 font-extrabold text-xl">Alle Boeken</div>
      <div class="content-center mx-auto flex flex-row justify-between">
          <SearchBar v-bind:placeholder="placeholder" @doSearch="searchBooks(0, $event, 'author', 'asc')"
              @goBack="searchBooks(0, '', 'author', 'asc')" class="m-2">
          </SearchBar>
      </div>


      <div class="flex flex-row py-4 border-b-2">
          <button @click="sortBooks('firstName', sortAscending)" class="w-36 font-extrabold text-left ml-8 underline underline-offset-4">Auteur</button>
          <button @click="sortBooks('lastName', sortAscending)" class="w-56 font-extrabold text-left underline underline-offset-4">Titel</button>
      </div>


      <div class="flex flex-col h-80 overflow-y-auto border-2 divide-y-2 mb-4">
          <BooksRowPopup v-for="book in books" :key="book.id" v-bind:book="book"
              @goToSelectCopy="$emit('showCopySelector', $event)">
          </BooksRowPopup>
      </div>

      <div>
          <PaginationBar v-bind:curPage="this.currentPage" v-bind:totalPages="totalPages"
              @changePage="changePageNumber($event)">

          </PaginationBar>

      </div>

  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import BooksRowPopup from '@/components/details/book-detail-page/BooksRowPopup.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';

export default {
  name: 'BookPopup',
  components: {
      BooksRowPopup,
      SearchBar,
      PaginationBar,

  },
  data() {
      return {
          books: [],
          placeholder: "Titel of Auteur",
          searchTerm: '',
          sortAscending: true,
          currentPage: 0,
          propertyToSortBy: 'author',
          pageableSize: 10,
          totalPages: -1
      };
  },
  mounted() {
      this.searchBooks(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
  },
  methods: {

      searchBooks(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
          let parameterDto = {}
          parameterDto.searchTerm = searchTerm;
          parameterDto.propertyToSortBy = propertyToSortBy
          parameterDto.directionOfSort = sortAscending ? "asc" : "desc";
          parameterDto.pageNumber = currentPageNumber
          parameterDto.numberPerPage = this.pageableSize

          axios.post("http://localhost:8080/book/searchEndPoint", parameterDto)
              .then(response => {
                  this.books = response.data.content;
                  this.totalPages = response.data.totalPages;
                  this.currentPage = currentPageNumber;
                  this.searchTerm = searchTerm;
              })
              .catch(error => {
                  console.log(error);
              });
      },

      sortBooks(propertyToSortBy) {
          this.currentPage = 0;
          if (propertyToSortBy != this.propertyToSortBy) {
              this.sortAscending = true;
              this.propertyToSortBy = propertyToSortBy;
          }
          else {
              this.sortAscending = !this.sortAscending
          }
          this.searchBooks(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
      },

      changePageNumber(change) {
          const tempPageNumber = this.currentPage + change
          if (tempPageNumber >= 0 && tempPageNumber <= (this.totalPages - 1)) {
              this.searchBooks(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.sortAscending)
          }
      },

  },
}
</script>