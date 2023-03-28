<template>
    <div class="flex flex-col w-full mx-8 ">

        <!-- Title Bar -->
        <div class="content-center flex flex-row justify-between border-b-2 border-zinc-400 align-middle">
            <router-link :to="{ name: 'add-book' }">
                <button class="text-white float-right px-3 py-2 m-2 h-fit rounded-md bg-blue-500 flex flex-nowrap align-middle ">
                    <span class="material-symbols-outlined mr-1">library_add</span>
                    Boek toevoegen
                </button>
            </router-link>
            <div class="p-4 text-center rounded-md font-bold text-lg ">Alle Boeken</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchBooks(0, $event, 'title', 'asc')"
                @goBack="searchBooks(0, '', 'title', 'asc')" class="m-2"/>
        </div>

        <!-- Header Bar -->
        <div class="flex flex-row justify-between border-b-2">
            <div class="flex flex-row py-4">
                <button @click="sortBooks('isbn', sortAscending)" class="w-36 font-extrabold text-left ml-8">ISBN</button>
                <button @click="sortBooks('author', sortAscending)" class="w-56 font-extrabold text-left">Auteur</button>
                <button @click="sortBooks('title', sortAscending)" class="font-extrabold text-left">Titel</button>

            </div>
            <div class="flex flex-row">
                <span class="p-4">Laat Gearchiveerde Boeken Zien</span>
                <div class="my-auto mx-2">
                    <ToggleButtonComponent @toggle="toggleArchived()"/>
                </div>
                <!-- <input type="checkbox" @click="toggleArchived()"> -->
            </div>
        </div>


        <!-- Book Row -->
        <div class="flex flex-col flex-wrap divide-y-2">
            <BookRow    v-for="book in books" :key="book.id" v-bind:book="book" 
                        @openAssignUserPopup="setBookPopup($event)"/>
        </div>

        <div>
            <PaginationBar v-bind:curPage="this.currentPage" v-bind:totalPages="this.totalPages"
                @changePage="changePageNumber($event)"/>

        </div>

        <PopUp  v-if="assignUserPopup" 
                v-bind:title="this.book.title"
                @closeUserPopup="assignUserPopup = false"
                @showCopySelector="showCopySelector($event); 
                    assignUserPopup = false" />
                    

        <CopyPopup  v-if="showCopyPopup" 
                    v-bind:bookId="book.id" 
                    @closeCopyPopup="showCopyPopup = false"
                    @createReservationFromNumber="createLoan($event); 
                        showCopyPopup = false; 
                        notifications.loanCreated = true" />


        <NotificationComponent v-bind:notificationText="'Lening gemaakt'"
            :class="[notifications.loanCreated ? 'visible' : 'invisible']"
            @closeNotification="notifications.loanCreated = false; closeAndReset(); refresh()"/>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import BookRow from '@/components/admin-panel/book-overview/BookRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';
import ToggleButtonComponent from '@/components/reusable-components/ToggleButtonComponent.vue';
import PopUp from '@/components/admin-panel/book-overview/AssignUserToBookPopup.vue'
import CopyPopup from '@/components/details/book-detail-page/CopyPopup.vue';
import NotificationComponent from '@/components/reusable-components/NotificationComponent.vue';

export default {
    name: 'BookView',
    components: {
        BookRow,
        SearchBar,
        PaginationBar,
        ToggleButtonComponent,
        PopUp,
        CopyPopup,
        NotificationComponent
    },
    data() {
        return {
            books: [],
            placeholder: "Auteur, Titel, ISBN...",
            searchTerm: '',
            sortAscending: true,
            currentPage: 0,
            propertyToSortBy: 'title',
            pageableSize: 10,
            archived: false,
            assignUserPopup: false,
            showCopyPopup: false,
            book: null,
            // showBooksPopup: false,
            notifications: { loanCreated: false },
            user: null,
            copy: null,
        };
    },
    mounted() {
        this.searchBooks(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchBooks(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            let parameterDto = {}
            parameterDto.searchTerm = searchTerm;
            parameterDto.propertyToSortBy = propertyToSortBy
            parameterDto.directionOfSort = sortAscending ? "asc" : "desc";
            parameterDto.pageNumber = currentPageNumber
            parameterDto.numberPerPage = this.pageableSize
            parameterDto.archived = this.archived
            console.log(parameterDto)

            axios.post("http://localhost:8080/book/searchEndPoint", parameterDto)
                .then(response => {
                    this.books = response.data.content;
                    this.totalPages = response.data.totalPages;
                    this.currentPage = currentPageNumber;
                    this.searchTerm = searchTerm;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortBooks(propertyToSortBy) {
            console.log("reach")
            this.currentPage = 0;
            if (propertyToSortBy != this.propertyToSortBy) {
                this.sortAscending = true;
                this.propertyToSortBy = propertyToSortBy;
            }
            else {
                this.sortAscending = !this.sortAscending
            }
            this.searchBooks(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        },


        changePageNumber(change) {
            const tempPageNumber = this.currentPage + change
            if (tempPageNumber >= 0 && tempPageNumber <= (this.totalPages - 1)) {
                this.searchBooks(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.sortAscending)
            }
        },
        setBookPopup(book) {
            this.assignUserPopup = true
            this.book = book
            console.log("book id from table" + this.book.id)
        },
        toggleArchived() {
            this.archived = !this.archived
            this.searchBooks(0, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        },
        showCopySelector(user) {
            this.user = user

            this.showCopyPopup = true
            console.log("create loan from user: " + this.book.id)
        },
        createLoan(copy) {
            this.copy = copy

            console.log("create copyId: " + this.copy.id)
            console.log("create bookId: " + this.book.id)
            console.log("create userId: " + this.user.id)

            let saveLoanDto = {}
            saveLoanDto.copyNumber = this.copy.number
            saveLoanDto.startDate = new Date()
            saveLoanDto.bookId = this.book.id
            saveLoanDto.userId = this.user.id
            console.log(this.reservation)

            axios.post('http://localhost:8080/loan/create', saveLoanDto)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                })
        },
        refresh() {
            window.location.reload()
        }

    },
}
</script>
