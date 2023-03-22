<template>
    <BookDetailAdmin v-if="store.getters.isAdmin"></BookDetailAdmin>
    <BookDetail v-if="!store.getters.isAdmin"></BookDetail>

</template>
  
<script>
import BookDetail from '@/components/details/BookDetail.vue';
import BookDetailAdmin from '@/views/detail-pages/BookDetailAdminView.vue';
import store from '@/store'

export default {
  name: 'HomeView',
  components: {
    BookDetailAdmin,
    BookDetail
  },
  data() {
    return {
      store
    }
  }
}
</script>
  