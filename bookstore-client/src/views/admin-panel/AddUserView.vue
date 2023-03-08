<template>
    <div class="AddUser">
      <SideBar></SideBar>
      <AddUser></AddUser>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import AddUser from '@/components/admin-panel/AddUser.vue';
  import SideBar from '@/components/SideBar.vue';
  
  export default {
    name: 'AddUserView',
    components: {
    AddUser,
    SideBar
}
  }
  </script>

<style>
.AddUser {
  display: flex;
  flex-wrap: nowrap;

}
</style>