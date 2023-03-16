<template>

    <div class="MyBooks">
        <h3 class="flex justify-center font-bold text-2xl mb-6">Mijn geleende boeken:</h3>
        <div class="flex flex-row flex-wrap justify-center">
            <MyBookCard v-for="loan in myLoans" :key="loan.id" v-bind:loan="loan">
            </MyBookCard>
        </div>
        <h3 class="flex justify-center font-bold text-2xl mt-16 mb-6">Mijn gereserveerde boeken:</h3>
        <div class="flex flex-row flex-wrap justify-center">
            <ReservationCard v-for="reservation in myReservations" :key="reservation.id" v-bind:reservation="reservation">
            </ReservationCard>
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

export default {
    name: 'CatalogueView',
    components: {
        // SearchBar,
        // BookCardStandardContainer,
        // BookCardSearchContainer
        MyBookCard,
        ReservationCard
    },
    data() {
        return {
            search: false,
            searchTermParent: "",
            myLoans: [],
            myReservations: [],
        };
    },
    mounted() {
        this.getMyLoans()
        this.getMyReservations()
    },
    methods: {
        getMyLoans() {
            axios.get('http://localhost:8080/user/2/loans/open')
                .then(response => {
                    this.myLoans = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getMyReservations() {
            axios.get('http://localhost:8080/user/2/reservations')
                .then(response => {
                    this.myReservations = response.data
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