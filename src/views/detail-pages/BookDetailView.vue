<template>
    <div class="home">

        <!-- <BookDetailAdmin></BookDetailAdmin> -->
        <!-- // TODO : use either bookdetail or BookDetailAdmin
        // Depending on token! -->
        <BookDetail></BookDetail>
  
  
    </div>
  </template>
  
  <script>
import BookDetail from '@/components/details/BookDetail.vue';
// import BookDetailAdmin from '@/components/details/BookDetailAdmin.vue';
  
  export default {
    name: 'HomeView',
    components: {
    BookDetail
}
  }
  </script>
  