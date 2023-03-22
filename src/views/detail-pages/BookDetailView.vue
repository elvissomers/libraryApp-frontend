<template>
  <div class="home my-20">

    <!-- <BookDetailAdmin></BookDetailAdmin> -->
    <!-- // TODO : use either bookdetail or BookDetailAdmin
        // Depending on token! -->
    <BookDetail></BookDetail>


  </div>
</template>
  
<script>
import BookDetail from '@/components/details/BookDetail.vue';

export default {
  name: 'HomeView',
  components: {
    // BookDetailAdmin,
    BookDetail
  },
}
</script>
  