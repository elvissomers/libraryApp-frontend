<template>
  <div class="home my-20">

    <BookDetailAdmin></BookDetailAdmin>


  </div>
</template>
  
<script>
import BookDetailAdmin from '@/components/details/BookDetailAdmin.vue';
import { store } from '@/store/store'

export default {
  name: 'HomeView',
  components: {
    BookDetailAdmin
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
  