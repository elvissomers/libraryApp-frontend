<template>

    <form @submit.prevent="createLoan">
        <label>Book:</label>
        <input id='book' type="number" v-model="loan.bookId" min="0" class="inline-input" required>
        <label>User:</label>
        <input id='user' type="number" v-model="loan.userId" min="0" class="inline-input" required>
        <button class="submit-btn">Creëer loan</button>
    </form>
    
</template>
<script>
import axios from 'axios';

export default {
  name: 'CreateLoan',
  data() {
    return {
        loan: {
            bookId: 0,
            userId: 0
        }
    };
  },
  methods: {
    // unused function
    createLoan() {
        let saveLoanDto = {}
        saveLoanDto.copyNumber = 1
        saveLoanDto.startDate = new Date().getDate()
        saveLoanDto.bookId = this.loan.bookId
        saveLoanDto.userId = this.loan.userId
        console.log(this.saveLoanDto)

        axios.post('http://localhost:8080/loan/create', saveLoanDto)
            .then(response => {
            console.log('Copy added:', response.data);
            })
            .catch(error => {
            console.log(error);
            })
        },
    },
};
</script>
<style>
</style>