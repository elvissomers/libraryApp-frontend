<template>
    <div class="flex flex-col w-full">

        <div class="content-center flex flex-row justify-between bg-slate-300">
            <div class="p-4 text-center rounded-md">Alle exemplaren van dit boek</div>

            <div class="flex flex-row">
            <span class="p-4">Laat Gearchiveerde Exemplaren Zien</span>
            <div class="my-auto mx-2">
                <ToggleButtonComponent @toggle="toggleArchived()"></ToggleButtonComponent>
            </div>
        </div>
        </div>


        <div class="flex flex-row py-4 border-b-2">
            <button class="w-48 font-extrabold text-left ml-8">Nummer</button>
            <button class="w-48 font-extrabold text-left">Beschikbaar</button>
            <button class="w-48 font-extrabold text-left">Uitgeleend sinds</button>
            <button class="w-48 font-extrabold text-left">Uitgeleend aan</button>
        </div>


        <div class="flex flex-col divide-y-2 h-96 overflow-y-auto">
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
import ToggleButtonComponent from '@/components/reusable-components/ToggleButtonComponent.vue';

export default {
    name: 'CopyView',
    components: {
        BookCopyRow,
        ToggleButtonComponent,
    },
    data() {
        return {
            copies: [],
            archived: false
        };
    },
    mounted() {
        this.searchCopies();
    },
    methods: {

        searchCopies() {
            let url = ''
            if (this.archived) {
                url = "http://localhost:8080/book/copies/archived/" + this.$route.params.id
            }
            else {
                url = "http://localhost:8080/book/copies/" + this.$route.params.id
            }
            axios.get(url)
                .then(response => {
                    this.copies = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },

        toggleArchived() {
            this.archived = !this.archived
            this.searchCopies()
        }

    }
}
</script>