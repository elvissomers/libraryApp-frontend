<template>
  <div class="flex flex-row justify-between hover:bg-slate-300">
    <div class="flex flex-row py-4">
      <div class="w-36 ml-8">{{ reservation.date }}</div>
      <div class="w-36">{{ reservation.userFirstName }}</div>
      <div class="w-36">{{ reservation.userLastName }}</div>
      <div class="">{{ reservation.bookTitle }}</div>
    </div>
    <button v-on:click="createReservation()"
      class="text-white float-right px-4 py-2 m-2 h-fit rounded-md"
      :class="[reservation.available ? 'bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300' : 'bg-gray-400 cursor-not-allowed']">Goedkeuren!
    </button>
  </div>
</template>
    
    
<script>
import axios from 'axios';

export default {
  name: "ReservationRow",
  props: ['reservation'],


  methods: {
    createReservation() {
      let saveReservationDto = {}
      saveReservationDto.copyNumber = 1
      saveReservationDto.date = new Date().getDate()
      saveReservationDto.bookId = this.reservation.bookId
      saveReservationDto.userId = this.reservation.userId
      console.log(this.reservation)

      axios.post('http://localhost:8080/reservation/create', saveReservationDto)
        .then(response => {
          console.log(response)
          console.log('Copy added:', response.data);
          alert("Exemplaar succesvol toegevoegd")
        })
        .catch(error => {
          console.log(error);
        })
      axios.delete(`http://localhost:8080/reservation/${this.reservation.id}`)
        .then(response => {
          console.log(response)
          console.log('reservation deleted')
          alert('reservation deleted')
        })
    },
  },

}


</script>
