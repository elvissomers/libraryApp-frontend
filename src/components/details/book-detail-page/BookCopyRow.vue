<template>
    <div class="flex flex-row justify-between hover:bg-slate-300">
        <div class="flex flex-row py-4">
            <div class="w-48 ml-8">{{ copy.number }}</div>
            <div class="w-48">{{ copy.available ? (copy.archived ? 'Gearchiveerd' : 'Beschikbaar') : (copy.archived ?
                'Gearchiveerd' : 'Uitgeleend') }}</div>
            <div class="w-48">{{ heldSincePresent ? copy.heldSince : "-" }}</div>
            <div class="w-48">{{ heldByUserFirstNamePresent ? copy.heldByUserFirstName : "-" }}</div>
            <!-- <button v-on:click="showUsers()" class="text-white float-right px-4 py-2 m-0 h-fit rounded-md w-48"
                :class="[copy.available ? 'bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300' : 'bg-gray-400 cursor-not-allowed']"
                :disabled="!copy.available">
                {{ copy.available ? 'Uitlenen' : 'Niet Beschikbaar' }}
            </button> -->

            <button v-if="!copy.archived && copy.available" v-on:click="showUsers()"
                class="text-white float-right px-4 py-2 m-0 h-fit rounded-md w-48 bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300">
                Uitlenen
            </button>

            <button v-if="!copy.archived && copy.loanId != 0" v-on:click="returnCopy()"
                class="text-white float-right px-4 py-2 m-0 h-fit rounded-md w-48 bg-yellow-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300">
                Terug Melden
            </button>

            <button v-if="copy.archived" v-on:click="dearchive()"
                class="ml-56 text-white float-right px-4 py-2 m-0 h-fit rounded-md w-48 bg-slate-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300">
                Dearchiveer
            </button>

            <button v-if="!copy.archived" v-on:click="archive()"
                class="ml-8 text-white float-right px-4 py-2 m-0 h-fit rounded-md w-48 bg-slate-400 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300">
                Archiveer
            </button>





        </div>

    </div>

    <UsersPopup class="fixed top-16 inset-x-0 mx-auto z-10" :class="[userPopupVisible ? 'visible' : 'invisible']"
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
            const headers = {
                'Authentication': localStorage.getItem('token')
            }

            axios.post('http://localhost:8080/loan/create', saveLoanDto, { headers: headers })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                })
            window.location.reload()
        },

        returnCopy() {
            let endDate = new Date()
            // TODO: zorg ervoor dat deze knop alert en refreshed
            axios.put("http://localhost:8080/loan/update/" + this.copy.loanId, { "endDate": endDate })
                .then(response => {
                    console.log(response)
                    window.location.reload()
                })
                .catch(error => {
                    console.log(error)
                })
            // window.location.reload()
        },

        archive() {
            if (confirm("Weet je zeker dat je dit exemplaar wilt archiveren? Het exemplaar kan dan niet meer uitgeleend worden.")) {
                axios.put("http://localhost:8080/copy/archive/" + this.copy.id)
                    .then(response => {
                        console.log(response.data)
                        alert("Exemplaar is gearchiveerd")
                        window.location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },

        dearchive() {
            if (confirm("Weet je zeker dat je dit exemplaar wilt dearchiveren? Het exemplaar kan dan weer uitgeleend worden.")) {
                axios.put("http://localhost:8080/copy/archive/" + this.copy.id)
                    .then(response => {
                        console.log(response.data)
                        alert("Exemplaar is terug gehaald")
                        window.location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }

}


</script>
  