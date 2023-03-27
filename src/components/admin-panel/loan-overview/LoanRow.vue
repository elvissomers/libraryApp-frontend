<template>
  <div class="flex flex-row justify-between hover:bg-blue-200">
    <div class="flex flex-row py-4">
      <div class="w-36 ml-8">{{ loan.startDate }}</div>
      <div class="w-36">{{ loan.endDate }}</div>
      <div class="w-36">{{ loan.userFirstName }}</div>
      <div class="w-36">{{ loan.userLastName }}</div>
      <div class="">{{ truncatedTitle }}</div>
    </div>
  </div>
</template>
    
    
<script>

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

  methods: {
  },

}


</script>
    