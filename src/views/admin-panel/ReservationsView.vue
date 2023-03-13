<template>
    <div class="Reservations flex flex-row">
        <SideBar></SideBar>

        <ReservationsTable></ReservationsTable>

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
    ReservationsTable
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
