<template>

    <div class="MyBooks my-20">
        <h3 class="flex justify-center font-bold text-2xl mb-6">Mijn geleende boeken:</h3>
        <div class="flex flex-row flex-wrap justify-center">
            <MyBookCard v-for="loan in myLoans" :key="loan.id" v-bind:loan="loan">
            </MyBookCard>
            <p v-if="myLoans.length === 0" class="text-gray-500">Je hebt geen boeken in bezit</p>
        </div>
        <h3 class="flex justify-center font-bold text-2xl mt-16 mb-6">Mijn gereserveerde boeken:</h3>
        <div class="flex flex-row flex-wrap justify-center">
            <ReservationCard v-for="reservation in myReservations" :key="reservation.id" v-bind:reservation="reservation">
            </ReservationCard>
            <p v-if="myReservations.length === 0" class="text-gray-500">Je hebt geen boeken gereserveerd</p>
        </div>
        <h3 class="flex justify-center font-bold text-2xl mb-6">Mijn eerder geleende boeken:</h3>
        <div class="flex flex-row flex-wrap justify-center">
            <MyHistoryBookCard v-for="loan in myHistory" :key="loan.id" v-bind:loan="loan">
            </MyHistoryBookCard>
            <p v-if="myHistory.length === 0" class="text-gray-500">Je hebt geen boeken in je geschiedenis</p>
        </div>
    </div>


    <!-- <div class="Catalogue">
      <SearchBar class="flex justify-center " 
      @doSearch="startSearch($event)"
      @goBack="goBackToCatalogue()" />

      <BookCardStandardContainer v-if="!this.search"></BookCardStandardContainer>      
      <BookCardSearchContainer
       v-if="this.search"
       :searchTerm="searchTermParent">
      </BookCardSearchContainer>
    </div> -->
</template>

<script>
// @ is an alias to /src
// import SearchBar from '@/components/reusable-components/SearchBar.vue'
// import BookCardStandardContainer from '@/components/catalogue-page/BookCardStandardContainer.vue';
// import BookCardSearchContainer from '@/components/catalogue-page/BookCardSearchContainer.vue';
import MyBookCard from '@/components/my-book-page/MyBookCard.vue';
import ReservationCard from '@/components/my-book-page/ReservationCard.vue';
import axios from 'axios';
import MyHistoryBookCard from '@/components/my-book-page/MyHistoryBookCard.vue';



export default {
    name: 'CatalogueView',
    components: {
        MyBookCard,
        MyHistoryBookCard,
        ReservationCard,
    },
    data() {
        return {
            search: false,
            searchTermParent: "",
            myLoans: [],
            myReservations: [],
            myHistory: [],
            user: {
                id: '',
                emailAddress: '',
                firstName: '',
                lastName: '',
                password: '',
            }, 
        };
    },
    mounted() {
        this.getUser()
    },
    methods: {
        getUser(){
            axios.get('http://localhost:8080/user/getbytoken/' + localStorage.getItem("token"))
                .then(response => {
                    this.user = response.data
                    console.log("found user" + this.user.id)
                    this.getMyLoans()
                    this.getMyReservations()
                    this.getMyHistory()
                    console.log(this.myLoans)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getMyLoans() {
            axios.get('http://localhost:8080/user/loans/open/' + this.user.id)
                .then(response => {
                    this.myLoans = response.data
                    console.log(this.myLoans)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getMyHistory(){
            axios.get('http://localhost:8080/user/loans/' + this.user.id)
                .then(response => {
                    this.myHistory = response.data
                    console.log(this.myHistory)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getMyReservations() {
            axios.get('http://localhost:8080/user/reservations/' + this.user.id)
                .then(response => {
                    this.myReservations = response.data
                    console.log(this.myReservations)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        startSearch(searchT) {
            this.searchTermParent = searchT
            this.search = true
        },
        goBackToCatalogue() {
            this.search = false
        },
    }
}
</script>