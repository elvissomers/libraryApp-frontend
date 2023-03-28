<template>
    <div class="flex flex-col w-full">

        <h4 class="text-xl text-gray-900 font-bold mb-4 pb-2 border-b">Alle actieve uitleningen van deze gebruiker</h4>


        <div class="flex flex-row py-4 border-b-2">
            <button class="w-48 font-extrabold text-left ml-8">Begin Datum</button>
            <button class="w-48 font-extrabold text-left">Eind Datum</button>
            <button class="w-48 font-extrabold text-left">Titel</button>
            <button class="w-48 font-extrabold text-left">Exemplaar nummer</button>
        </div>


        <div class="flex flex-col divide-y-2 max-h-96 overflow-y-auto">
            <UserLoanRow v-for="loan in loans" :key="loan.id" v-bind:loan="loan">
            </UserLoanRow>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import UserLoanRow from '@/components/details/user-detail-page/UserLoanRow.vue';

export default {
    name: 'UserLoanTable',
    components: {
        UserLoanRow
    },
    data() {
        return {
            loans: []
        };
    },
    mounted() {
        this.searchLoans();
    },
    methods: {

        searchLoans(){
            axios.get("http://localhost:8080/user/loans/open/" + this.$route.params.id)
                .then(response => {
                    this.loans = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }


    }


</script>