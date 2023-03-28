<template>
  <div class="flex flex-row justify-between hover:bg-blue-200">
    <div class="flex flex-row py-4">
      <div class="w-36 ml-8">{{ loan.startDate }}</div>
      <div class="w-36">{{ loan.endDate }}</div>
      <div class="w-36">{{ loan.userFirstName }}</div>
      <div class="w-36">{{ loan.userLastName }}</div>
      <div class="w-36">{{ loan.copyNumber }}</div>

      <div class="">{{ truncatedTitle }}</div>
    </div>

    <button v-on:click="returnCopy()"
        class="text-white float-right px-4 py-2 m-2 h-fit rounded-md w-48"
        :class="[!loan.endDate? 'bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300' : 'bg-gray-400 cursor-not-allowed']"
        :disabled="loan.endDate"
        >Terug Melden
        
      
      </button>
  </div>
</template>
    
    
<script>

import axios from 'axios'

export default {  
  name: "LoanRow",
  props: ['loan'],
  computed: {
    truncatedTitle() {
      if (this.loan.bookTitle.length > 50) {
        return this.loan.bookTitle.substring(0, 50) + '...';
      } else {
        return this.loan.bookTitle;
      }
    },
  },

  data(){
      return{
        endLoan:{
          endDate : new Date()
        }
      }
    },

  methods: {

    returnCopy(){
        // TODO: zorg ervoor dat deze knop alert en refreshed
        axios.put("http://localhost:8080/loan/update/" + this.loan.id, this.endLoan)
          .then(response => {
            console.log(response)
            window.location.reload()
          })
          .catch(error => {
            console.log(error)
          })
          window.location.reload()
    }
  },

}


</script>
    