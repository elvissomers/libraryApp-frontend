<template>

  <div class="home">


    <BookDetailAdmin></BookDetailAdmin>
    <div class="w-4/5 flex flex-col mx-auto">
    <BookCopyTable></BookCopyTable>
    <BookLoanTable></BookLoanTable>
    <BookReservationTable></BookReservationTable>
  </div>

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
    BookDetailAdmin,
  },

  data() {
    return {
    }
  },

  mounted() {
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
  