<template>
    <div class="home">

        <BookDetailAdmin></BookDetailAdmin>
        <BookCopyTable></BookCopyTable>
        <BookLoanTable></BookLoanTable>
        <BookReservationTable></BookReservationTable>
  
  
    </div>
  </template>
  
  <script>
import BookDetailAdmin from '@/components/details/BookDetailAdmin.vue';
import BookLoanTable from '@/components/details/book-detail-page/BookLoanTable.vue'
import BookReservationTable from '@/components/details/book-detail-page/BookReservationTable.vue';
import BookCopyTable from '@/components/details/book-detail-page/BookCopyTable.vue';
  
  export default {
    name: 'HomeView',
    components: {
    BookCopyTable,
    BookReservationTable,
    BookLoanTable,
    BookDetailAdmin
    },
    mounted(){
        this.authenticateAdmin()
    },
    methods: {
        authenticateAdmin() {
        if (localStorage.getItem('token') == null || localStorage.getItem('admin') != 'true') {
          this.$router.push('/login')
            // this.$router.push('/book/user' + this.$route.params.id);
            console.log('redirecting to login')
        }
    }

  }
}
  </script>
  