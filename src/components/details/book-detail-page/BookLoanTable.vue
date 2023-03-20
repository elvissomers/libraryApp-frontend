<template>
    <div class="flex flex-col w-full">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">Alle actieve uitleningen van dit boek</div>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button class="w-48 font-extrabold text-left ml-8">Datum</button>
            <button class="w-48 font-extrabold text-left">Voornaam</button>
            <button class="w-48 font-extrabold text-left">Achternaam</button>
            <button class="w-48 font-extrabold text-left">Exemplaar nummer</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <BookLoanRow v-for="loan in loans" :key="loan.id" v-bind:loan="loan">
            </BookLoanRow>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import BookLoanRow from '@/components/details/book-detail-page/BookLoanRow.vue';

export default {
    name: 'LoanView',
    components: {
        BookLoanRow
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
            axios.get("http://localhost:8080/book/loans/" + this.$route.params.id)
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