<template>
    <div class="Requests">
      <SideBar></SideBar>
      <CreateLoanFromReservation></CreateLoanFromReservation>
  
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
}
    }   
</script>
  
  <style>
  .Requests {
  display: flex;
  flex-wrap: nowrap;
  
  }
  </style>