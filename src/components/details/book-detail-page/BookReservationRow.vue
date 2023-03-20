<template>
    <div class="flex flex-row justify-between hover:bg-slate-300">
      <div class="flex flex-row py-4">
        <div class="w-36 ml-8">{{ reservation.date }}</div>
        <div class="w-36">{{ reservation.userFirstName }}</div>
        <div class="w-36">{{ reservation.userLastName }}</div>
      </div>
      <button v-on:click="createLoan()"
        class="text-white float-right px-4 py-2 m-2 h-fit rounded-md w-48"
        :class="[reservation.available ? 'bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300' : 'bg-gray-400 cursor-not-allowed']"
        :disabled="!reservation.available">
        {{ reservation.available ? 'Goedkeuren!' : 'Niet Beschikbaar' }}
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
        saveLoanDto.copyNumber = prompt("Welk copy number wil je toekennen?")
        saveLoanDto.startDate = new Date().getDate()
        saveLoanDto.bookId = this.reservation.bookId
        saveLoanDto.userId = this.reservation.userId
        console.log(this.reservation)
  
        axios.post('http://localhost:8080/loan/create', saveLoanDto)
          .then(response => {
            console.log(response)
            console.log('Loan added:', response.data);
            alert("Reservering succesvol goedgekeurd")
          })
          .catch(error => {
            console.log(error);
          })
        axios.delete(`http://localhost:8080/reservation/delete/${this.reservation.id}`)
          .then(response => {
            console.log(response)
            console.log('reservation deleted')
            alert('reservation deleted')
          })
      },
    },
  
  }
  
  
  </script>
  