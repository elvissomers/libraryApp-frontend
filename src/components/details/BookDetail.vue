<template>
  <section class="text-gray-700 body-font overflow-hidden">
    <div class="container px-5 pt-16 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap justify-center">
        <img v-if="!bookFetching" alt="ecommerce" class="mt-6 h-96 rounded border border-white border-4 "
          v-bind:src="require(`@/assets/bookCovers/` + book.isbn + `.jpg`)">

        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <span v-if="!bookFetching" class="text-sm title-font text-gray-500 mr-2 tracking-widest">{{ book.author
          }}</span>

          <h1></h1>
          <span v-if="!bookFetching" class="text-gray-900 text-3xl mr-2 title-font font-medium mb-1">{{ book.title
          }}</span>
          <div class="flex mb-4">
          </div>
          <BookKeyword v-for="keyword in book.keywords" :key="keyword" v-bind:keyword="keyword">
          </BookKeyword>
          <!-- Description -->
          <p v-if="!bookFetching" class="leading-relaxed h-64 overflow-y-auto border-4 p-4 border-slate-200">{{
            book.description }}</p>
          <div class="flex py-2 items-center border-b-2 border-gray-200">
            <div class="flex">
              <span v-if="!bookFetching" class="mr-3">ISBN: {{ book.isbn }}</span>
            </div>
          </div>
          <div class="text-xl py-4">Aantal Beschikbaar: {{ this.numberAvailable }}</div>
          <div class="flex">
            <!-- removed: ml-auto -->
            <button @click="createReservation(); notifications.reservation = true"
              class="flex text-white bg-lime-500 border-0 py-2 px-6 mr-2 focus:outline-none hover:bg-lime-600 rounded">Reserveer</button>
          </div>
          <NotificationComponent v-bind:notificationText="this.textNotification"
              :class="[notifications.reservation ? 'visible' : 'invisible']"
              @closeNotification="notifications.reservation = false; refresh()"></NotificationComponent>



        </div>
      </div>
    </div>
  </section>
</template>
    


<script>
import axios from 'axios';
import BookKeyword from './book-detail-page/BookKeyword.vue';
import NotificationComponent from '../reusable-components/NotificationComponent.vue';

export default {
  name: 'MyBooksView',

  components: {
    BookKeyword,
    NotificationComponent
  },

  data() {
    return {
      book: [],
      numberAvailable: -1,
      textNotification: '',
      bookFetching: true,
      reservation: {
        date: '',
        userId: '',
        bookId: '',
      },
      notifications: {reservation: false}
    };
  },
  mounted() {
    this.getBook()
    this.getUser()
    this.countCopies()
  },
  methods: {
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
          this.book = response.data;
          this.bookFetching = false
        })
        .catch(error => {
          console.log(error);
        });
    },

    countCopies() {
      axios.get('http://localhost:8080/book/copies/available/' + this.$route.params.id)
        .then(response => {
          if (response.data.length > 0) {
            this.numberAvailable = response.data.length;
            console.log(response.data.length)
          }
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
          console.log('Reservation created:', response.data);
          if (response.data) {
            this.textNotification = "Reservering gelukt"
          } else {
            this.textNotification = "Je hebt dit boek al gereserveerd"
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    getCurrentDatey() {
      let currentDate = new Date().toJSON().slice(0, 10);
      // console.log(currentDate); // "2023-03-13"
      return currentDate
    },

    refresh() {
      window.location.reload()
    }
  },
}
</script>
    
    
<style></style>