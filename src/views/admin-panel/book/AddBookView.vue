<template>
  <div class="AddBook">
    <SideBar></SideBar>
    <AddBook></AddBook>
  </div>
</template>
  
<script>
// @ is an alias to /src
import AddBook from '@/components/admin-panel/book/AddBook.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';

export default {
  name: 'AddUserView',
  components: {
    SideBar,
    AddBook
  },
  mounted() {
    this.authenticate()
    this.authenticateAdmin()
  },
  methods: {
    authenticate() {
      if (localStorage.getItem('token') == null ) {
          alert("You need to be logged in to view this page")
          this.$router.push('/login');
          console.log('redirecting to login')
      }
    },
    authenticateAdmin() {
        if (localStorage.getItem('admin') != 'true') {
            alert("You need admin rights to view the Admin panel")
            this.$router.push('/');
            console.log('redirecting to home')
        }
    }
  }
}
</script>

<style>
.AddBook {
  display: flex;
  flex-wrap: nowrap;

}
</style>