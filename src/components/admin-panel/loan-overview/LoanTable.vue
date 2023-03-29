<template>
    <div class="flex flex-col w-full mx-8 ">


        <div class="content-center flex flex-row justify-between border-b-2 border-zinc-400">
            <button @click="showUsersPopup = true"
                    class="text-white float-right px-4 py-2 m-2 h-fit rounded-md bg-blue-500">
                Uitlening Toevoegen
            </button>
            <div class="p-4 text-center rounded-md font-bold text-lg">Alle Uitleningen</div>


            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchLoans(0, $event, 'startDate', 'asc')"
                @goBack="searchLoans(0, '', 'startDate', 'asc')" class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row justify-between border-b-2">
            <div class="flex flex-row py-4">
                <button @click="sortLoans('startDate', sortAscending)" class="w-28 font-extrabold text-left ml-8">Uitleen
                    Datum</button>
                <button @click="sortLoans('endDate', sortAscending)" class="w-28 font-extrabold text-left">Inlever
                    Datum</button>
                <button @click="sortLoans('user.firstName', sortAscending)" class="w-28 font-extrabold text-left">Voornaam</button>
                <button @click="sortLoans('user.lastName', sortAscending)" class="w-28 font-extrabold text-left">Achternaam</button>
                <button @click="sortLoans('copy.number', sortAscending)"
                    class="w-24 font-extrabold text-left">Exemplaar</button>
                <button @click="sortLoans('copy.book.title', sortAscending)" class="font-extrabold text-left">Boek
                    Titel</button>
            </div>
            <div class="flex flex-row">
                <span class="p-4">Laat Ingeleverde Boeken Zien</span>
                <div class="my-auto mx-2">
                    <ToggleButtonComponent @toggle="toggleOpen()"></ToggleButtonComponent>
                </div>
                <!-- <input type="checkbox" @click="toggleArchived()"> -->
            </div>
        </div>


        <div class="flex flex-col flex-wrap divide-y-2">
            <LoanRow v-for="loan in loans" :key="loan.id" v-bind:loan="loan">
            </LoanRow>
        </div>

        <div>
            <PaginationBar v-bind:curPage="this.currentPage" v-bind:totalPages="this.totalPages"
                @changePage="changePageNumber($event)">

            </PaginationBar>

        </div>

        <UsersPopup v-if="showUsersPopup" @closeUserPopup="showUsersPopup = closeAndReset()"
            @createLoanFromUser="this.user = $event; showUsersPopup = false; showBooksPopup = true"></UsersPopup>

        <BooksPopup v-if="showBooksPopup" @closeBooksPopup="showBooksPopup = closeAndReset()"
            @showCopySelector="this.book = $event; showBooksPopup = false; showCopyPopup = true" />

        <CopyPopup v-if="showCopyPopup" v-bind:bookId="this.book.id" @closeCopyPopup="showCopyPopup = closeAndReset()"
            @createReservationFromNumber="this.copy = $event; showCopyPopup = false; notifications.loanCreated = true; createLoan()" />

        <NotificationComponent v-bind:notificationText="'Lening gemaakt'"
            :class="[notifications.loanCreated ? 'visible' : 'invisible']"
            @closeNotification="notifications.loanCreated = false; closeAndReset(); refresh()"></NotificationComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import LoanRow from '@/components/admin-panel/loan-overview/LoanRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';
import ToggleButtonComponent from '@/components/reusable-components/ToggleButtonComponent.vue';
import UsersPopup from '@/components/details/book-detail-page/UsersPopup.vue';
import BooksPopup from '@/components/details/book-detail-page/BooksPopup.vue';
import CopyPopup from '@/components/details/book-detail-page/CopyPopup.vue';
import NotificationComponent from '@/components/reusable-components/NotificationComponent.vue';

export default {
    name: 'LoanView',
    components: {
        LoanRow,
        SearchBar,
        PaginationBar,
        ToggleButtonComponent,
        UsersPopup,
        BooksPopup,
        CopyPopup,
        NotificationComponent
    },
    data() {
        return {
            loans: [],
            placeholder: "Naam of Titel",
            searchTerm: '',
            sortAscending: true,
            currentPage: 0,
            propertyToSortBy: 'startDate',
            pageableSize: 10,
            showClosed: true,
            totalPages: -1,
            showUsersPopup: false,
            showBooksPopup: false,
            showCopyPopup: false,
            notifications: { loanCreated: false },
            book: null,
            user: null,
            copy: null,
        };
    },
    mounted() {
        this.searchLoans(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchLoans(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            let parameterDto = {}
            parameterDto.searchTerm = searchTerm;
            parameterDto.propertyToSortBy = propertyToSortBy
            parameterDto.directionOfSort = sortAscending ? "asc" : "desc";
            parameterDto.pageNumber = currentPageNumber
            parameterDto.numberPerPage = this.pageableSize
            parameterDto.open = this.showClosed

            axios.post("http://localhost:8080/loan/searchEndPoint", parameterDto)
                .then(response => {
                    this.loans = response.data.content;
                    this.totalPages = response.data.totalPages;
                    this.currentPage = currentPageNumber
                    this.searchTerm = searchTerm;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortLoans(propertyToSortBy) {
            this.currentPage = 0;
            if (propertyToSortBy != this.propertyToSortBy) {
                this.sortAscending = true;
                this.propertyToSortBy = propertyToSortBy;
            }
            else {
                this.sortAscending = !this.sortAscending
            }
            this.searchLoans(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPage + change
            if (tempPageNumber >= 0 && tempPageNumber <= (this.totalPages - 1)) {
                this.searchLoans(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.sortAscending)
            }
        },

        toggleOpen() {
            this.showClosed = !this.showClosed
            this.searchLoans(0, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        },

        createLoan() {
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

        closeAndReset() {
            this.user = null
            this.book = null
            this.copy = null
            this.showUsersPopup = false
            this.showBooksPopup = false
            this.showCopyPopup = false
        },

        refresh() {
            window.location.reload()
        }

    },
}
</script>