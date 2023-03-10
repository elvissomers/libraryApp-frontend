<template>
    <div class="MyBooks">
      <SideBar></SideBar>
        Loaned books:
        <div class="flex flex-row flex-wrap justify-center">
            <LoanRow
            v-for="loan in loans" :key="loan.id"
            v-bind:id="loan.id" 
            v-bind:endDate="loan.endDate" 
            v-bind:startDate="loan.startDate" 
            v-bind:userFirstName="loan.userFirstName"
            v-bind:userLastName="loan.userLastName"
            v-bind:bookTitle="loan.bookTitle">
            </LoanRow>
        </div>

    </div>
  </template>

<script>
// @ is an alias to /src
import axios from 'axios';
import LoanRow from '@/components/admin-panel/LoanRow.vue';
import SideBar from '@/components/SideBar.vue';


export default {
  name: 'MyBooksView',
  components: {
    LoanRow,
    SideBar
},
  data() {
    return {
      loans: [],
    };
  },
  mounted() {
    this.getLoans();
  },
  methods: {
    getLoans() {
      axios.get('http://localhost:8080/loan')
        .then(response => {
          this.loans = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
}
</script>


<style>
.MyBooks {
  display: flex;
  flex-wrap: nowrap;

}
</style>

