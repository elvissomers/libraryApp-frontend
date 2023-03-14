<template>
  <div class="flex flex-row justify-between hover:bg-slate-300">
    <div class="flex flex-row py-4">
      <div class="w-12 ml-8">{{ loan.id }} </div>
      <div class="w-28">{{ loan.startDate }}</div>
      <div class="w-28">{{ loan.userFirstName }}</div>
      <div class="w-28">{{ loan.userLastName }}</div>
      <div>{{ loan.bookTitle }}</div>
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
    