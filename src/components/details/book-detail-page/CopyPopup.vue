<template>
    <div class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="flex flex-col w-2/5 h-3/4 bg-white p-8 rounded-3xl fixed top-8">

            <div class="w-full">
                <button v-on:click="this.$emit('closeCopyPopup')" type="button" class="float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="mx-auto">


            <div class="p-4 text-center rounded-md underline underline-offset-8 font-extrabold text-xl">Alle Exemplaren
            </div>
            <div class="content-center flex flex-row justify-between">
            </div>


            <div class="flex flex-row py-4 border-b-2">
                <button @click="sortReservations('number', sortAscending)"
                    class="w-36 font-extrabold text-left ml-8 ">Exemplaar
                    nummer</button>
            </div>


            <div class="flex flex-col h-80 overflow-y-auto divide-y-2 mb-4">
                <CopyRowPopup v-for="copy in copies" :key="copy.id" v-bind:copy="copy"
                    @createReservationFromNumber="$emit('createReservationFromNumber', $event)">
                </CopyRowPopup>

                <p class="flex-wrap" v-if="copies.length === 0">Er zijn geen exemplaren van dit boek beschikbaar</p>
            </div>
        </div>

        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import CopyRowPopup from '@/components/details/book-detail-page/CopyRowPopup.vue';

export default {
    name: 'CopyPopup',
    components: {
        CopyRowPopup,
    },

    props: ['bookId'],

    data() {
        return {
            copies: [],

        };
    },
    mounted() {
        this.searchCopies();
        console.log("bookid: " + this.bookId)
    },
    methods: {

        searchCopies() {
            axios.get('http://localhost:8080/book/copies/available/' + this.bookId)
                .then(response => {

                    if (response.data.length > 0) {
                        this.copies = response.data;
                        console.log("copy length: " + this.copies.length )
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            
            console.log("no copies: " + this.copies.length )
        },

        



    },
}
</script>