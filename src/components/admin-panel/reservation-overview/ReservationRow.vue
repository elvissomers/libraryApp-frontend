<template>
  <div class="flex flex-row justify-between hover:bg-blue-200">
    <div class="flex flex-row py-4">
      <div class="w-36 ml-8">{{ reservation.date }}</div>
      <div class="w-36">{{ reservation.userFirstName }}</div>
      <div class="w-36">{{ reservation.userLastName }}</div>
      <div class="">{{ truncatedTitle }}</div>
    </div>
    <div class="flex flex-row">
      <button v-on:click="showCopies()" class="text-white float-right px-4 py-2 m-2 h-fit rounded-md w-40"
        :class="[reservation.available ? 'bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300' : 'bg-gray-400 cursor-not-allowed']"
        :disabled="!reservation.available">
        {{ reservation.available ? 'Goedkeuren' : 'Niet Beschikbaar' }}
      </button>
      <button @click='deleteReservation(reservation.id)'
        class="text-white float-right ml-4 px-4 py-2 m-2 h-fit rounded-md w-40 bg-red-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300">Afwijzen!</button>
    </div>
  </div>

  <CopyPopup v-bind:bookId="reservation.bookId" class="fixed top-32 inset-x-0 mx-auto z-10"
    :class="[copyPopupVisible ? 'visible' : 'invisible']" @closeCopyPopup="copyPopupVisible = false"
    @createReservationFromNumber="createLoan($event)"></CopyPopup>
</template>
    
    
<script>
import axios from 'axios';
import CopyPopup from '@/components/details/book-detail-page/CopyPopup.vue';

export default {
  name: "ReservationRow",
  props: ['reservation'],
  components: { CopyPopup },

  data() {
    return {
      copyPopupVisible: false,
    }
  },
  computed: {
    truncatedTitle() {
      if (this.reservation.bookTitle.length > 50) {
        return this.reservation.bookTitle.substring(0, 50) + '...';
      } else {
        return this.reservation.bookTitle;
      }
    },
  },
  methods: {
    showCopies() {
      this.copyPopupVisible = true
    },

    createLoan(copy) {
      let saveReservationDto = {}
      saveReservationDto.copyNumber = copy.number
      saveReservationDto.startDate = new Date()
      saveReservationDto.bookId = this.reservation.bookId
      saveReservationDto.userId = this.reservation.userId
      console.log(this.reservation)

      axios.post('http://localhost:8080/loan/create', saveReservationDto)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        })
      this.deleteReservation(this.reservation.id)
    },

    deleteReservation(id) {
      axios.delete(`http://localhost:8080/reservation/delete/${id}`)
        .then(response => {
          console.log(response)
          window.location.reload()
        })
    }
  },

}


</script>
