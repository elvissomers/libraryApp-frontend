<template>
  <div class="home">


    <BookDetailAdmin></BookDetailAdmin>
    <BookCopyTable></BookCopyTable>
    <BookLoanTable></BookLoanTable>
    <BookReservationTable></BookReservationTable>

    <UsersPopup class="fixed top-32 inset-x-0 mx-auto z-10" :class="[userPopupVisible ? 'visible' : 'invisible']"
      @closeUserPopup="userPopupVisible = false"></UsersPopup>

    <CopyPopup v-bind:bookId="$route.params.id" class="fixed top-32 inset-x-0 mx-auto z-10"
      :class="[copyPopupVisible ? 'visible' : 'invisible']" @closeCopyPopup="copyPopupVisible = false"></CopyPopup>

  </div>
</template>

  
<script>
import BookDetailAdmin from '@/components/details/BookDetailAdmin.vue';
import BookLoanTable from '@/components/details/book-detail-page/BookLoanTable.vue'
import BookReservationTable from '@/components/details/book-detail-page/BookReservationTable.vue';
import UsersPopup from '@/components/details/book-detail-page/UsersPopup.vue'
import CopyPopup from '@/components/details/book-detail-page/CopyPopup.vue';
import BookCopyTable from '@/components/details/book-detail-page/BookCopyTable.vue';

export default {
  name: 'HomeView',


  components: {
    BookCopyTable,
    BookReservationTable,
    BookLoanTable,
    BookDetailAdmin,
    UsersPopup,
    CopyPopup
  },

  data() {
    return {
      userPopupVisible: false,
      copyPopupVisible: true,
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
  