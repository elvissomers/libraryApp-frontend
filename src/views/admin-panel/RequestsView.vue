<template>
    <div class="Requests">
        <SideBar></SideBar>
        <CreateLoanFromReservation class="my-8"></CreateLoanFromReservation>

    </div>
</template>
  
<script>
// @ is an alias to /src
import CreateLoanFromReservation from '@/components/admin-panel/reservation-overview/CreateLoanFromReservation.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';

export default {
    name: 'RequestsView',
    components: {
        SideBar,
        CreateLoanFromReservation
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
.Requests {
    display: flex;
    flex-wrap: nowrap;

}
</style>