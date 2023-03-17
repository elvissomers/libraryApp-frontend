<template>
    <div class="home">

        <BookDetailAdmin></BookDetailAdmin>
  
  
    </div>
  </template>
  
  <script>
import BookDetailAdmin from '@/components/details/BookDetailAdmin.vue';
  
  export default {
    name: 'HomeView',
    components: {
    BookDetailAdmin
    },
    mounted(){
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
  