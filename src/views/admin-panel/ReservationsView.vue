<template>
  <div class="Reservations flex flex-row">
    <SideBar></SideBar>
    <ReservationsTable class="my-8"></ReservationsTable>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/reusable-components/SideBar.vue';
import ReservationsTable from '@/components/admin-panel/reservation-overview/ReservationsTable.vue';
import { store } from '@/store/store'


export default {
  name: 'ReservationsView',
  components: {
    SideBar,
    ReservationsTable,
  },
  data() {
    return {
      store
    }
  },
  mounted() {
    this.store.authenticate(this.$router)
    this.store.authenticateAdmin(this.$router)
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
