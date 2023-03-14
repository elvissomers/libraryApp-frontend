<template>
    <div class="flex flex-col w-full mx-8">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">All Loans</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchLoans($event)" @goBack="getLoans()" class="m-2">
            </SearchBar>
        </div>

        <div class="flex flex-row py-4 border-b-2">
            <div class="w-12 ml-8 font-extrabold">Id</div>
            <div class="w-28 font-extrabold">Date</div>
            <div class="w-28 font-extrabold">Name</div>
            <div class="w-28 font-extrabold">Surname</div>
            <div class="font-extrabold">Book Title</div>
        </div>
        

        <div class="flex flex-col flex-wrap divide-y-2">
            <LoanRow v-for="loan in loans" :key="loan.id" v-bind:loan="loan">
            </LoanRow>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import LoanRow from '@/components/admin-panel/loan-overview/LoanRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';

export default {
    name: 'LoanedBooksView',
    components: {
        LoanRow,
        SearchBar
    },
    data() {
        return {
            loans: [],
            placeholder: "First or last name"
        };
    },
    mounted() {
        this.getLoans();
    },
    methods: {
        getLoans() {
            axios.get('http://localhost:8080/loan')
                .then(response => {
                    this.loans = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        searchLoans(searchTerm) {
            axios.get('http://localhost:8080/loansearch/'+searchTerm+'/0/50')
                .then(response => {
                    this.loans = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
}
</script>