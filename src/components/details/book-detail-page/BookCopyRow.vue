<template>
    <div class="flex flex-row justify-between hover:bg-slate-300">
        <div class="flex flex-row py-4">
            <div class="w-36 ml-8">{{ copy.number }}</div>
            <div class="w-36 ml-8">{{ availabilityString }}</div>
        </div>
        <!-- <button v-on:click="createLoan()"
        class="text-white float-right px-4 py-2 m-2 h-fit rounded-md w-48"
        :class="[reservation.available ? 'bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300' : 'bg-gray-400 cursor-not-allowed']"
        :disabled="!reservation.available">
        {{ reservation.available ? 'Goedkeuren!' : 'Niet Beschikbaar' }}
      </button> -->
    </div>
</template>
      
      
<script>
import axios from 'axios';

export default {
    name: "CopyRow",
    props: ['copy'],
    data() {
        return {
            availabilityString: ''
        }
    },

    mounted() {
        this.availabilityToString()
    },

    methods: {
        availabilityToString() {
            if (this.copy.available){
                this.availabilityString = "Beschikbaar"
            } else {
                this.availabilityString = "Niet beschikbaar"
            }
            console.log("Made availability into a string")
        }
    }

}


</script>
  