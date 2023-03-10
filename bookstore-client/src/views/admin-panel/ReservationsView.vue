<template>
    <div class="Reservations">
        <SideBar></SideBar>

        <div class="flex flex-row flex-wrap justify-center">
            All reservations
            <ReservationRow
            v-for="reservation in reservations" :key="reservation.id"
            v-bind:id="reservation.id" 
            v-bind:date="reservation.date" 
            v-bind:userFirstName="reservation.userFirstName" 
            v-bind:userLastName="reservation.userLastName"
            v-bind:bookTitle="reservation.bookTitle">
            </ReservationRow>
        </div>

    </div>
  </template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ReservationRow from '@/components/admin-panel/ReservationRow.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'ReservationsView',
  components: {
    ReservationRow,
    SideBar
},
  data() {
    return {
      reservations: [],
    };
  },
  mounted() {
    this.getReservations();
  },
  methods: {
    getReservations() {
      axios.get('http://localhost:8080/reservation')
        .then(response => {
          this.reservations = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
}
</script>

<style>
.Reservations {
  display: flex;
  flex-wrap: nowrap;

}
</style>
