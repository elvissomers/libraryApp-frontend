<template>
    <div class="flex flex-row justify-between hover:bg-slate-300">
      <div class="flex flex-row py-4">
        <div class="w-36 ml-8">{{ loan.startDate }}</div>
        <div class="w-36">{{ loan.userFirstName }}</div>
        <div class="w-36">{{ loan.userLastName }}</div>
        <div class="w-36">{{ loan.copyNumber }}</div>
        <button @click='returnCopy()'
                class="flex text-white bg-yellow-500 border-0 py-2 px-6 ml-2 focus:outline-none hover:bg-yellow-600 rounded">
              Terug melden</button>
      </div>
      </div>
  </template>
      
      
  <script>
  import axios from 'axios';
  
  export default {
    

    name: "LoanRow",
    props: ['loan'],
    data(){
      return{
        endLoan:{
          endDate : new Date().getDate()
        }
      }
    },
  
    methods: {
      returnCopy(){
        axios.put("http://localhost:8080/loan/update/" + this.loan.id, this.endLoan)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
    }
  
  }
}
  
  
  </script>
      