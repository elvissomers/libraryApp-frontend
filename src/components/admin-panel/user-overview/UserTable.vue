<template>
    <div class="flex flex-col w-full mx-8 ">

        <!-- removed: bg-zinc-300  border-y-2 border-zinc-400-->
        <div class="content-center flex flex-row justify-between align-middle bg-white border-b-2 border-zinc-400">
            <router-link :to="{ name: 'add-user' }">
                <button class="text-white float-right px-4 py-2 m-2 h-fit rounded-md bg-blue-500 align-middle">
                    <span class="material-symbols-outlined align-middle mr-1">person_add</span>
                    Gebruiker toevoegen
                </button>
            </router-link>
            <div class="p-4 text-center rounded-md font-bold text-lg ">Alle Gebruikers</div>
            <SearchBar v-bind:placeholder="placeholder" @doSearch="searchUsers(0, $event, 'lastName', 'asc')"
                @goBack="searchUsers(0, '', 'lastName', 'asc')" class="m-2">
            </SearchBar>
        </div>


        <div class="flex flex-row py-4 border-b-2 bg-white" >
            <button @click="sortUsers('firstName', sortAscending)" class="w-36 font-extrabold text-left ml-8">
                <span class="material-symbols-outlined align-middle mr-1">sort_by_alpha</span>
                Voornaam
            </button>
            <button @click="sortUsers('lastName', sortAscending)" class="w-56 font-extrabold text-left">
                <span class="material-symbols-outlined align-middle mr-1">sort_by_alpha</span>
                Achternaam
            </button>
            <button @click="sortUsers('emailAddress', sortAscending)" class="font-extrabold text-left">
                <span class="material-symbols-outlined align-middle mr-1">sort_by_alpha</span>
                Email Address
            </button>
            <!-- <span class="material-symbols-outlined">sort</span> -->
        </div>


        <div class="flex flex-col flex-wrap divide-y-2 bg-white">
            <UserRow v-for="user in users" :key="user.id" v-bind:user="user" @showBookPopup="setBookPopup($event)">
            </UserRow>
        </div>

        <div>
            <PaginationBar v-bind:curPage="this.currentPage" v-bind:totalPages="this.totalPages"
                @changePage="changePageNumber($event)">

            </PaginationBar>

        </div>

        <PopUp  v-if="showBookPopup" 
                v-bind:person="this.user.firstName"
                @closeAssignUserPopup="showBookPopup = false" 
                @showCopySelector="showCopySelector($event);
        showBookPopup = false" />

        <CopyPopup  v-if="showCopyPopup" 
                    v-bind:bookId="book.id" 
                    @closeCopyPopup="showCopyPopup = false"
                    @createReservationFromNumber="createLoan($event);
                        showCopyPopup = false;
                        notifications.loanCreated = true" />

        <NotificationComponent v-bind:notificationText="'Lening gemaakt'"
            :class="[notifications.loanCreated ? 'visible' : 'invisible']"
            @closeNotification="notifications.loanCreated = false; refresh()"></NotificationComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import UserRow from '@/components/admin-panel/user-overview/UserRow.vue';
import SearchBar from '@/components/reusable-components/SearchBar.vue';
import PaginationBar from '@/components/reusable-components/PaginationBar.vue';
import PopUp from '@/components/admin-panel/user-overview/AssignBookToUserPopup.vue'
import CopyPopup from '@/components/details/book-detail-page/CopyPopup.vue';
import NotificationComponent from '@/components/reusable-components/NotificationComponent.vue';

export default {
    name: 'UserView',
    components: {
        UserRow,
        SearchBar,
        PaginationBar,
        PopUp,
        CopyPopup,
        NotificationComponent
    },
    data() {
        return {
            users: [],
            placeholder: "Voor of Achter Naam",
            searchTerm: '',
            sortAscending: true,
            currentPage: 0,
            propertyToSortBy: 'lastName',
            pageableSize: 10,
            totalPages: -1,
            showBookPopup: false,
            showCopyPopup: false,
            book: null,
            notifications: {loanCreated: false},
            user: null
        };
    },
    mounted() {
        this.searchUsers(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending);
    },
    methods: {

        searchUsers(currentPageNumber, searchTerm, propertyToSortBy, sortAscending) {
            let parameterDto = {}
            parameterDto.searchTerm = searchTerm;
            parameterDto.propertyToSortBy = propertyToSortBy
            parameterDto.directionOfSort = sortAscending ? "asc" : "desc";
            parameterDto.pageNumber = currentPageNumber
            parameterDto.numberPerPage = this.pageableSize

            axios.post("http://localhost:8080/user/searchEndPoint", parameterDto)
                .then(response => {
                    this.users = response.data.content;
                    this.totalPages = response.data.totalPages;
                    this.currentPage = currentPageNumber;
                    this.searchTerm = searchTerm;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        sortUsers(propertyToSortBy) {
            this.currentPage = 0;
            if (propertyToSortBy != this.propertyToSortBy) {
                this.sortAscending = true;
                this.propertyToSortBy = propertyToSortBy;
            }
            else {
                this.sortAscending = !this.sortAscending
            }
            this.searchUsers(this.currentPage, this.searchTerm, this.propertyToSortBy, this.sortAscending)
        },

        changePageNumber(change) {
            const tempPageNumber = this.currentPage + change
            if (tempPageNumber >= 0 && tempPageNumber <= (this.totalPages - 1)) {
                this.searchUsers(tempPageNumber, this.searchTerm, this.propertyToSortBy, this.sortAscending)
            }
        },
        showCopySelector(book) {
            this.book = book
            this.showCopyPopup = true
            console.log(this.book)
        },
        createLoan(copy) {
            console.log("creating loan")

            let saveLoanDto = {}
            saveLoanDto.copyNumber = copy.number
            saveLoanDto.startDate = new Date()
            saveLoanDto.bookId = this.book.id
            saveLoanDto.userId = this.user.id // get juiste ID
            console.log(saveLoanDto)

            axios.post('http://localhost:8080/loan/create', saveLoanDto)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                })
        },
        setBookPopup(user) {
            this.showBookPopup = true
            this.user = user
        }


    },
}
</script>
