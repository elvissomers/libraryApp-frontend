<template>
  <div class="home my-20">

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
  name: 'BookDetailAdminView',
  components: {
    BookCopyTable,
    BookReservationTable,
    BookLoanTable,
    BookDetailAdmin,
  },
}
</script>
  