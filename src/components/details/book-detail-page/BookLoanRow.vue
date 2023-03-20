<template>
    <div class="flex flex-row justify-between hover:bg-slate-300">
      <div class="flex flex-row py-4">
        <div class="w-36 ml-8">{{ loan.startDate }}</div>
        <div class="w-36">{{ loan.userFirstName }}</div>
        <div class="w-36">{{ loan.userLastName }}</div>
        <div class="">{{ loan.bookTitle }}</div>
      </div>
    </div>
  </template>
      
      
  <script>
  
  export default {
    name: "LoanRow",
    props: ['loan'],
  
    methods: {
    },
  
  }
  
  
  </script>
      