<template>
    <div class="flex flex-row justify-between hover:bg-slate-300">
        <div class="flex flex-row py-4">
            <div class="w-36 ml-8">{{ copy.number }}</div>
            <div class="w-36 ml-8">{{ availabilityString }}</div>
            <div class="w-36 ml-8">{{ heldSincePresent ? copy.heldSince : "-" }}</div>
            <div class="w-36 ml-8">{{ heldByUserFirstNamePresent ? copy.heldByUserFirstName : "-" }}</div>
            <button v-on:click="createLoan()"
        class="text-white float-right px-4 py-2 m-0 h-fit rounded-md w-48"
        :class="[copy.available ? 'bg-green-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300' : 'bg-gray-400 cursor-not-allowed']"
        :disabled="!copy.available">
        {{ copy.available ? 'Uitlenen' : 'Niet Beschikbaar' }}
        </button>
        </div>
        
    </div>
</template>
      
      
<script>

export default {
    name: "CopyRow",
    props: ['copy'],
    data() {
        return {
            availabilityString: '',
            heldSincePresent: this.copy.heldSince !== null,
            heldByUserFirstNamePresent: this.copy.heldByUserFirstName !== null
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
        },

        createLoan(){
            //TODO
        }
    }

}


</script>
  