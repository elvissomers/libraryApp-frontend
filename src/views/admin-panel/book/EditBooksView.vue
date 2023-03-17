<template>
  <div class="flex flex-row">
    <SideBar></SideBar>
    <BookTable></BookTable>
  </div>
</template>

<script>
// @ is an alias to /src
//import ChangeAdminStatus from '@/components/admin-panel/ChangeAdminStatus.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import BookTable from '@/components/admin-panel/book-overview/BookTable.vue';

export default {
  name: 'EditBookView',
  components: {
    SideBar,
    BookTable,
    //ChangeAdminStatus
    
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