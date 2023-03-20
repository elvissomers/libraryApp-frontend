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
import { store } from '@/store/store'

export default {
    name: 'RequestsView',
    components: {
        SideBar,
        CreateLoanFromReservation
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
.Requests {
    display: flex;
    flex-wrap: nowrap;

}
</style>