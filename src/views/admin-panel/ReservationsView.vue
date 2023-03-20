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


export default {
  name: 'ReservationsView',
  components: {
    SideBar,
    ReservationsTable,
  },
  data() {
    return {

    };
  },
  mounted() {
    this.authenticate()
    this.authenticateAdmin()
  },
  methods: {
    authenticate() {
      if (localStorage.getItem('token') == null ) {
          alert("You need to be logged in to view this page")
          this.$router.push('/login');
          console.log('redirecting to login')
      }
    },
    authenticateAdmin() {
        if (localStorage.getItem('admin') != 'true') {
            alert("You need admin rights to view the Admin panel")
            this.$router.push('/');
            console.log('redirecting to home')
        }
    }
  }
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
