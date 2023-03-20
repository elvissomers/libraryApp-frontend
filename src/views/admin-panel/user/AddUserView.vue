<template>
  <div class="AddUser">
    <SideBar></SideBar>
    <div class="mx-auto">
      <AddUser class="my-28"></AddUser>
    </div>
    
  </div>
</template>
  
<script>
// @ is an alias to /src
import AddUser from '@/components/admin-panel/user/AddUser.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';

export default {
  name: 'AddUserView',
  components: {
    AddUser,
    SideBar
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
.AddUser {
  display: flex;
  flex-wrap: nowrap;

}
</style>