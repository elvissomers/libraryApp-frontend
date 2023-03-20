<template>
    <div class="home">

        <BookDetailAdmin></BookDetailAdmin>
        <BookLoanTable></BookLoanTable>
  
  
    </div>
  </template>
  
  <script>
import BookDetailAdmin from '@/components/details/BookDetailAdmin.vue';
import BookLoanTable from '@/components/details/book-detail-page/BookLoanTable.vue'
  
  export default {
    name: 'HomeView',
    components: {
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
  