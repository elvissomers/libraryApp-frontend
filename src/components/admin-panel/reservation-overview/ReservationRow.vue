<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row py-4">
      <div class="w-12 ml-8">{{ reservation.id }} </div>
      <div class="w-28">{{ reservation.date }}</div>
      <div class="w-28">{{ reservation.userFirstName }}</div>
      <div class="w-28">{{ reservation.userLastName }}</div>
      <div>{{ reservation.bookTitle }}</div>
    </div>
    <button v-on:click="createLoan()"
      class="float-right bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Goedkeuren!
    </button>
  </div>
</template>
    
    
<script>
import axios from 'axios';

export default {
  name: "ReservationRow",
  props: ['reservation'],

  methods: {
    createLoan() {
      let saveLoanDto = {}
      saveLoanDto.copyNumber = 1
      saveLoanDto.startDate = new Date().getDate()
      saveLoanDto.bookId = this.reservation.bookId
      saveLoanDto.userId = this.reservation.userId
      console.log(this.reservation)

      axios.post('http://localhost:8080/loan/create', saveLoanDto)
        .then(response => {
          console.log(response)
          console.log('Copy added:', response.data);
          alert("Exemplaar succesvol toegevoegd")
          window.location.reload()
        })
        .catch(error => {
          console.log(error);
        })
      axios.delete(`http://localhost:8080/reservation/${this.reservation.id}`)
        .then(response => {
          console.log(response)
          console.log('reservation deleted')
          alert('reservation deleted')
          window.location.reload()
        })
    },
  },

}


</script>
    