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
// import BookDetailAdmin from '@/components/details/BookDetailAdmin.vue';
  
  export default {
    name: 'HomeView',
    components: {
    // BookDetailAdmin,
    BookDetail
  },
  mounted(){
        this.authenticateAdmin()
    },
    methods: {
        authenticateAdmin() {
        if (localStorage.getItem('admin') == 'true') {
          // this.$router.push('/admin/edit-users')
            this.$router.push('/book/admin/' + this.$route.params.id);
            console.log('redirecting to login')
        }
    }
  }
  }
  </script>
  