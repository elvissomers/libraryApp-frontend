<template>
    <div class="flex flex-row justify-between hover:bg-slate-300">
        <div class="flex flex-row py-4">
            <div class="w-36 ml-8">{{ copy.number }}</div>
            <div class="w-36 ml-8">{{ availabilityString }}</div>
            <div class="w-36 ml-8">{{ heldSincePresent ? copy.heldSince : "-" }}</div>
            <div class="w-36 ml-8">{{ heldByUserFirstNamePresent ? copy.heldByUserFirstName : "-" }}</div>
            <button v-on:click="showUsers()" class="text-white float-right px-4 py-2 m-0 h-fit rounded-md w-48"
                :class="[copy.available ? 'bg-green-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300' : 'bg-gray-400 cursor-not-allowed']"
                :disabled="!copy.available">
                {{ copy.available ? 'Uitlenen' : 'Niet Beschikbaar' }}
            </button>
        </div>

    </div>

    <UsersPopup class="fixed top-32 inset-x-0 mx-auto z-10" :class="[userPopupVisible ? 'visible' : 'invisible']"
        @closeUserPopup="userPopupVisible = false" @createLoanFromUser="createLoan($event)"></UsersPopup>
</template>
      
      
<script>
import UsersPopup from '@/components/details/book-detail-page/UsersPopup.vue'
import axios from 'axios'

export default {

    name: "CopyRow",
    props: ['copy'],
    data() {
        return {
            availabilityString: '',
            heldSincePresent: this.copy.heldSince !== null,
            heldByUserFirstNamePresent: this.copy.heldByUserFirstName !== null,
            userPopupVisible: false,
        }
    },

    components: {
        UsersPopup,
    },

    mounted() {
        this.availabilityToString()
    },

    methods: {
        availabilityToString() {
            if (this.copy.available) {
                this.availabilityString = "Beschikbaar"
            } else {
                this.availabilityString = "Niet beschikbaar"
            }
            console.log("Made availability into a string")
        },

        showUsers() {
            this.userPopupVisible = true
        },

        createLoan(user) {

            let saveLoanDto = {}
            saveLoanDto.copyNumber = this.copy.number
            saveLoanDto.startDate = new Date()
            saveLoanDto.bookId = this.$route.params.id
            saveLoanDto.userId = user.id
            console.log(saveLoanDto)

            axios.post('http://localhost:8080/loan/create', saveLoanDto)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                })
            window.location.reload()
        }
    }

}


</script>
  