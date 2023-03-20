<template>
  <div class="flex flex-row">
    <SideBar></SideBar>
    <LoanTable class="my-8"></LoanTable>
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
    LoanTable,
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
<style>
.Reservations {
  display: grid;
  grid-template-columns: 0fr 3fr;
  gap: 1rem;
}

.grid-container {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .Reservations {
    grid-template-columns: 1fr;
  }
}
</style>
