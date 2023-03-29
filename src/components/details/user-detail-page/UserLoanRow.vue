<template>
    <div class="flex flex-row justify-between hover:bg-slate-300">
      <div class="flex flex-row py-4">
        <div class="w-48 ml-8">{{ loan.startDate }}</div>
        <div class="w-48">{{ loan.endDate }}</div>
        <div class="w-48">{{ loan.bookTitle }}</div>
        <div class="w-48">{{ loan.copyNumber }}</div>
        <button @click='returnCopy()'
        class="text-white float-right px-4 py-2 m-0 h-fit rounded-md w-48 bg-yellow-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300">
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
          endDate : new Date()
        }
      }
    },
  
    methods: {
        returnCopy() {
            let endDate = new Date()
            // TODO: zorg ervoor dat deze knop alert en refreshed
            axios.put("http://localhost:8080/loan/update/" + this.loan.id, { "endDate": endDate })
                .then(response => {
                    console.log(response)
                    window.location.reload()
                })
                .catch(error => {
                    console.log(error)
                })
            // window.location.reload()
        },
  
  }
}
  
  
  </script>
      