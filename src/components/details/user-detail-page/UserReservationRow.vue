<template>
    <div class="flex flex-row justify-between hover:bg-slate-300">
      <div class="flex flex-row py-4">
        <div class="w-48 ml-8">{{ reservation.date }}</div>
        <div class="w-96">{{ reservation.bookTitle }}</div>
        
        <button v-on:click="showCopies()" class="text-white float-right px-4 py-2 m-0 h-fit rounded-md w-48"
          :class="[reservation.available ? 'bg-green-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300' : 'bg-gray-400 cursor-not-allowed']"
          :disabled="!reservation.available">
          {{ reservation.available ? 'Goedkeuren!' : 'Niet Beschikbaar' }}
  
          <!-- <span v-if="reservation.available" class="material-symbols-outlined">thumb_up</span> -->
          <p></p>
        </button>
  
        <button @click='deleteReservation(reservation.id)'
          class="text-white float-right ml-8 px-4 py-2 m-0 h-fit rounded-md w-48 bg-red-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300">Afwijzen!</button>
      </div>
  
  
      <CopyPopup v-bind:bookId="reservation.bookId" class=""
        :class="[copyPopupVisible ? 'visible' : 'invisible']" @closeCopyPopup="copyPopupVisible = false"
        @createReservationFromNumber="createLoan($event)"></CopyPopup>
  
    </div>
  </template>
        
        
  <script>
  import axios from 'axios';
  import CopyPopup from '@/components/details/book-detail-page/CopyPopup.vue';
  
  export default {
    name: "UserReservationRow",
    props: ['reservation'],
  
    components: {
      CopyPopup
    },
  
    data() {
      return {
        copyPopupVisible: false,
      }
    },
  
    methods: {
      showCopies() {
        this.copyPopupVisible = true
      },
  
      createLoan(copy) {
  
        let saveLoanDto = {}
        saveLoanDto.copyNumber = copy.number
        saveLoanDto.startDate = new Date()
        saveLoanDto.bookId = this.reservation.bookId
        saveLoanDto.userId = this.reservation.userId
        console.log(saveLoanDto)
  
        axios.post('http://localhost:8080/loan/create', saveLoanDto)
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
    