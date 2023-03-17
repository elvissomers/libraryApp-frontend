<template>
    <div class="home">

        <BookDetailAdmin></BookDetailAdmin>
  
  
    </div>
  </template>
  
  <script>
// import BookDetail from '@/components/details/BookDetail.vue';
import BookDetailAdmin from '@/components/details/BookDetailAdmin.vue';
  
  export default {
    name: 'HomeView',
    components: {
    // BookDetail
    BookDetailAdmin
}
  }
  </script>
  