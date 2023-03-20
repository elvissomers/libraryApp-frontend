<template>
    <div class="flex flex-col w-full mx-8 ">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">Alle exemplaren van dit boek</div>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button class="w-36 font-extrabold text-left ml-8">Nummer</button>
            <button class="w-36 font-extrabold text-left ml-8">Beschikbaar</button>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <BookCopyRow v-for="copy in copies" :key="copy.id" v-bind:copy="copy">
            </BookCopyRow>
        </div>

        <div>
            <!-- <PaginationBar v-bind:curPage="this.currentPage" @changePage="changePageNumber($event)">

            </PaginationBar> -->

        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import BookCopyRow from './BookCopyRow.vue';

export default {
    name: 'CopyView',
    components: {
        BookCopyRow
    },
    data() {
        return {
            copies: []
        };
    },
    mounted() {
        this.searchCopies();
    },
    methods: {

        searchCopies() {
            axios.get("http://localhost:8080/book/copies/" + this.$route.params.id)
                .then(response => {
                    this.copies = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }
}
</script>