<template>
  <section class="text-gray-700 body-font overflow-hidden">
    <div class="container mx-auto">
      <div v-if="!bookFetching" class="lg:w-full mx-auto flex flex-wrap justify-center">
        <img v-if="bookCoverExists" alt="ecommerce" class="mt-6 h-96 rounded border border-white border-4"
          v-bind:src="require(`@/assets/bookCovers/` + book.isbn + `.jpg`)">
        <div v-if="!bookCoverExists"
          class="mt-6 h-96 rounded border border-white border-4 text-center flex items-center justify-center">No Image
          Available
        </div>

        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <!-- Author -->
          <span v-if="!bookFetching" class="text-sm title-font text-gray-500 mr-2 tracking-widest">{{ book.author
          }}</span>

          <button @click="showPrompt('author')"
            class="text-white bg-grey-500 border-0 py-1 px-1 focus:outline-none hover:bg-grey-600 rounded">
            <img alt="ecommerce" class="lg:w-1/1 w-4 object-cover object-center rounded"
              src="https://cdn-icons-png.flaticon.com/512/61/61456.png?w=740&t=st=1678887410~exp=1678888010~hmac=91d3144990e622b8cafc0f2e8f4123973c3327bf4b075f343aaec0581930ca12">
          </button>
          <PromptComponent v-bind:book="book" v-bind:typePrompt="'Voer een nieuwe auteur in'" class=""
            :class="[prompts.author ? 'visible' : 'invisible']" @closePrompt="prompts.author = false"
            @saveField="changeField('author', $event)"></PromptComponent>

          <!-- Title -->
          <span v-if="!bookFetching" class="text-gray-900 text-3xl mr-2 title-font font-medium mb-1">{{ book.title
          }}</span>

          <button @click="showPrompt('title')"
            class="text-white bg-grey-500 border-0 py-1 px-1 focus:outline-none hover:bg-grey-600 rounded">
            <img alt="ecommerce" class="lg:w-1/1 w-4 object-cover object-center rounded"
              src="https://cdn-icons-png.flaticon.com/512/61/61456.png?w=740&t=st=1678887410~exp=1678888010~hmac=91d3144990e622b8cafc0f2e8f4123973c3327bf4b075f343aaec0581930ca12">
          </button>
          <PromptComponent v-bind:book="book" v-bind:typePrompt="'Voer een nieuwe titel in'" class=""
            :class="[prompts.title ? 'visible' : 'invisible']" @closePrompt="prompts.title = false"
            @saveField="changeField('title', $event)"></PromptComponent>


          <div class="flex mb-4">
          </div>

          <div v-if="!bookFetching">
            <button @click="prompts.keyword = true"
              class="text-white bg-blue-500 px-2 border-0 p-1 m-1 rounded-md hover:bg-blue-600">
              +
            </button>
            <BookKeyword v-for="keyword in book.keywords" :key="keyword" v-bind:keyword="keyword">
            </BookKeyword>

          </div>
          <PromptComponent v-bind:typePrompt="'Welk keyword wil je toevoegen?'"
            :class="[prompts.keyword ? 'visible' : 'invisible']" @closePrompt="prompts.keyword = false"
            @saveField="addKeyword($event); showNotification('keyword')" />

          <!-- Description -->
          <p v-if="!bookFetching" class="leading-relaxed h-64 overflow-y-auto border-y-2 p-1 my-2 border-slate-400">{{
            book.description }}</p>
          <button @click="showPrompt('description')"
            class="text-white bg-grey-500 border-0 py-1 px-1 focus:outline-none hover:bg-grey-600 rounded">
            <img alt="ecommerce" class="lg:w-1/1 w-4 object-cover object-center rounded"
              src="https://cdn-icons-png.flaticon.com/512/61/61456.png?w=740&t=st=1678887410~exp=1678888010~hmac=91d3144990e622b8cafc0f2e8f4123973c3327bf4b075f343aaec0581930ca12">
          </button>

          <PromptComponent v-bind:book="book" v-bind:typePrompt="'Voer een beschrijving in'" class=""
            :class="[prompts.description ? 'visible' : 'invisible']" @closePrompt="prompts.description = false"
            @saveField="changeField('description', $event)"></PromptComponent>


          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div class="flex">
              <span v-if="!bookFetching" class="mr-3">ISBN: {{ book.isbn }}</span>

              <button @click="changeIsbn()"
                class="text-white bg-grey-500 border-0 py-1 px-1 focus:outline-none hover:bg-grey-600 rounded">
                <img alt="ecommerce" class="lg:w-1/1 w-4 object-cover object-center rounded"
                  src="https://cdn-icons-png.flaticon.com/512/61/61456.png?w=740&t=st=1678887410~exp=1678888010~hmac=91d3144990e622b8cafc0f2e8f4123973c3327bf4b075f343aaec0581930ca12">
              </button>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex">
            <!-- removed: ml-auto -->
            <button @click="createReservation(); notifications.reservation = true"
              class="flex text-white bg-lime-500 border-0 py-2 px-6 mr-2 focus:outline-none hover:bg-lime-600 rounded px-20 text-center">Reserveer</button>

            <NotificationComponent v-bind:notificationText="this.textNotification"
              :class="[notifications.reservation ? 'visible' : 'invisible']"
              @closeNotification="notifications.reservation = false; refresh()"></NotificationComponent>


            <button @click="showPrompt('nCopies')"
              class="flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Maak
              nieuwe kopie aan</button>
            <PromptComponent v-bind:typePrompt="'Hoeveel exemplaren wil je toevoegen?'"
              :class="[prompts.nCopies ? 'visible' : 'invisible']" @closePrompt="prompts.nCopies = false"
              @saveField="createCopies($event); showNotification('nCopies')"></PromptComponent>

            <NotificationComponent v-bind:notificationText="'Exemplaren aangemaakt'"
              :class="[notifications.nCopies ? 'visible' : 'invisible']"
              @closeNotification="notifications.nCopies = false; refresh()"></NotificationComponent>


          </div>
        </div>
      </div>
    </div>
  </section>
</template>
      
  
  
<script>
import axios from 'axios';

import BookKeyword from './book-detail-page/BookKeyword.vue';
import PromptComponent from '@/components/reusable-components/PromptComponent.vue'
import NotificationComponent from '../reusable-components/NotificationComponent.vue';


export default {
  name: 'MyBooksView',

  components: {
    BookKeyword,
    PromptComponent,
    NotificationComponent
  },

  computed: {
    bookCoverExists() {
      if (this.bookFetching) {
        return false;
      }
      try {
        require(`@/assets/bookCovers/${this.book.isbn}.jpg`);
        return true;
      } catch (e) {
        return false;
      }
    }
  },

  data() {
    return {
      book: null,
      bookFetching: true,
      reservation: {
        date: '',
        userId: '',
        bookId: '',
      },
      user: {
        id: '',
        emailAddress: '',
        firstName: '',
        lastName: '',
        password: '',
      },
      copy: {
        // TODO: this needs to be the actual ID of the book
        bookId: 0,
        amount: 1
        // ?
        // bookId: this.book.id
      },
      prompts: { description: false, title: false, author: false, nCopies: false, keyword: false },
      notifications: { nCopies: false, reservation: false },
      textNotification: ''
    };
  },
  mounted() {
    this.getBook()
    this.getUser()
  },
  methods: {
    // Get methods from here
    getCurrentDate() {
      let currentDate = new Date().toJSON().slice(0, 10);
      // console.log(currentDate); // "2023-03-13"
      return currentDate
    },

    getUser() {
      axios.get('http://localhost:8080/user/getbytoken/' + localStorage.getItem("token"))
        .then(response => {
          this.user = response.data
          console.log("found user" + this.user.id)
        })
        .catch(error => {
          console.log(error)
        })
    },

    getBook() {
      axios.get('http://localhost:8080/book/get/' + this.$route.params.id)
        .then(response => {
          console.log(response.data)
          this.book = response.data;
          this.copy.bookId = this.book.id;
          this.bookFetching = false
        })
        .catch(error => {
          console.log(error);
        });
    },

    createReservation() {
      this.reservation.date = this.getCurrentDatey()
      this.reservation.userId = this.user.id
      this.reservation.bookId = this.book.id
      console.log(this.reservation)

      let headers = {
        'Authentication': localStorage.getItem('token')
      }

      axios.post('http://localhost:8080/reservation/create', this.reservation, {
        headers: headers
      })
        .then(response => {

          if (response.data) {
            this.textNotification = "Reservering gemaakt"

          } else {
            this.textNotification = "Je hebt dit boek al gereserveerd"
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCurrentDatey() {
      let currentDate = new Date().toJSON().slice(0, 10);
      // console.log(currentDate); // "2023-03-13"
      return currentDate
    },

    // Create methods from here
    createCopy() {
      this.copy.amount = 1
      axios.post('http://localhost:8080/copy/create', this.copy)
        .then(response => {
          console.log('Copy added:', response.data);
          alert("Kopie is aangemaakt")
          window.location.reload()
        })
        .catch(error => {
          console.log(error);
        })
    },


    createCopies(numberOfCopies) {
      this.copy.amount = numberOfCopies
      if (this.copy.amount > 0) {
        axios.post('http://localhost:8080/copy/create', this.copy)
          .then(response => {
            console.log('Copy added:', response.data);
          })
          .catch(error => {
            console.log(error);
          })
      }
    },

    addKeyword(keywordName) {

      let keyword = {
        name: keywordName,
        bookId: this.book.id
      }
      axios.post('http://localhost:8080/keyword/create', keyword)
        .then(response => {
          console.log("Keyword toegevoegd: ", response)
          console.log('Added keyword: ', keywordName, 'to book: ', this.book.title)
          window.location.reload()
        })
        .catch(error => {
          console.log(error)
          alert("Er is iets mis gegaan!")
        })
    },


    changeIsbn() {
      let newIsbn = prompt("Voer nieuw ISBN in:")
      let changeBook = this.book
      changeBook.isbn = newIsbn

      alert("ISBN veranderen niet toegestaan!")
      // axios.put('http://localhost:8080/book/' + this.$route.params.id, changeBook)
      // console.log('Changed isbn into ', newIsbn)
    },

    showPrompt(typePrompt) {
      this.prompts[typePrompt] = true
    },

    showNotification(typeNotification) {
      this.notifications[typeNotification] = true
    },

    changeField(whichField, newFieldValue) {
      let headers = {
        'Authentication': localStorage.getItem('token')
      }
      let changeBook = this.book
      changeBook[whichField] = newFieldValue
      axios.put('http://localhost:8080/book/update/' + this.$route.params.id, changeBook, {
        headers: headers
      })
    },

    refresh() {
      window.location.reload()
    }


  },
}
</script>
      
      
<style></style>