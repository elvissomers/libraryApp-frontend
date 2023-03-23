<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="popup-header">
        <h2>Books</h2>
        <button class="close-btn" @click="$emit('close')">Sluit</button>
      </div>
      <div class="popup-body">
        <ul>
          <li class='bookClass' v-for="book in books" :key="book.id">
            {{ book.title }}
            <button class="bookClass" @click="showCopy(book)">Bekijk Exemplaren</button>
            <CopyPopup v-if="selectedBook && showCopyPopup && selectedBook.id === book.id" v-bind:bookId="book.id"
              @createReservationFromNumber="createLoan(book.id, $event)">
            </CopyPopup>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
  
<script>
import axios from 'axios';
import CopyPopup from './CopyPopup.vue';

export default {
  components: {
    CopyPopup
  },
  data() {
    return {
      books: [],
      selectedBook: null,
      showCopyPopup: false
    };
  },

  mounted() {
    this.searchBooks();
  },

  methods: {
    searchBooks() {
      axios.get('http://localhost:8080/book/get')
        .then((response) => {
          if (response.data.length > 0) {
            this.books = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showCopy(book) {
      this.selectedBook = book;
      if (this.showCopyPopup) {
        this.showCopyPopup = false
      }
      else {
        this.showCopyPopup = true;
      }
    },
    createLoan(bookId, copyNumber) {
      let saveLoanDto = {}
      saveLoanDto.copyNumber = copyNumber
      saveLoanDto.startDate = new Date()
      saveLoanDto.bookId = bookId
      saveLoanDto.userId = this.$route.params.id
      console.log(saveLoanDto)
      const headers = {
        'Authentication': localStorage.getItem('token')
      }

      axios.post('http://localhost:8080/loan/create', saveLoanDto, { headers: headers })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        })
      alert("Lening is aangemaakt!")
      window.location.reload()
    }
  },
};
</script>
  
<style>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-inner {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  border: none;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
}

.popup-body {
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.bookClass {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
  
  