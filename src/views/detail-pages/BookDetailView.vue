<template>
    <BookDetailAdmin></BookDetailAdmin>
    <BookDetail></BookDetail>
  <div class="home my-20">
    <!-- If user is admin-->
    
    <!-- else -->
    


  </div>
</template>
  
<script>
import BookDetail from '@/components/details/BookDetail.vue';
import { store } from '@/store/store';
import BookDetailAdmin from '@/views/detail-pages/BookDetailAdminView.vue';

export default {
  name: 'HomeView',
  components: {
    BookDetailAdmin,
    BookDetail
  },
  data() {
    return {
      store
    };
  },
  mounted() {
    this.store.authenticate(this.$router)
  },
}
</script>
  