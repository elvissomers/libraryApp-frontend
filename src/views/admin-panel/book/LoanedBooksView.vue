<template>
  <div class="Reservations flex flex-row">
      <SideBar></SideBar>

      <LoanTable></LoanTable>

  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/reusable-components/SideBar.vue';
import LoanTable from '@/components/admin-panel/loan-overview/LoanTable.vue';

export default {
name: 'ReservationsView',
components: {
  SideBar,
  LoanTable
},
data() {
  return {

  };
},
mounted() {

},
methods: {

},
}
</script>

