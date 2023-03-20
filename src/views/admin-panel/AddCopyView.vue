<template>
  <div class="AddCopy">
    <SideBar></SideBar>
    <AddCopy class="my-8"></AddCopy>
  </div>
</template>
  
<script>
// @ is an alias to /src
import AddCopy from '@/components/admin-panel/book/AddCopy.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';

export default {
  name: 'AddUserView',
  components: {
    SideBar,
    AddCopy
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
.AddCopy {
  display: flex;
  flex-wrap: nowrap;

}
</style>