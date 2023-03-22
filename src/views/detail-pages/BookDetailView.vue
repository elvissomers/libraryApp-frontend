<template>
  <template v-if="localstorage.getItem('admin') == true">
    <div v-if="true">
      <BookDetailAdmin></BookDetailAdmin>
    </div>
    <div v-else>
      <BookDetail></BookDetail>
    </div>
  </template>
  <div class="home my-20">
    <!-- If user is admin-->
    
    <!-- else -->
    


  </div>
</template>
  
<script>
import BookDetail from '@/components/details/BookDetail.vue';
import BookDetailAdmin from '@/views/detail-pages/BookDetailAdminView.vue';


export default {
  name: 'HomeView',
  components: {
    BookDetailAdmin,
    BookDetail
  },
}
</script>
  