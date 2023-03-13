<template>
    <div class="flex flex-col w-full mx-8">
    <div class="bg-slate-300 p-4 text-center rounded-md">All reservations</div>
    <div class="flex flex-col flex-wrap divide-y-2">
        <ReservationRow v-for="reservation in reservations" 
            :key="reservation.id"
            v-bind:reservation="reservation">
        </ReservationRow>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ReservationRow from '@/components/admin-panel/reservation-overview/ReservationRow.vue';

export default {
    name: 'ReservationsView',
    components: {
        ReservationRow
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