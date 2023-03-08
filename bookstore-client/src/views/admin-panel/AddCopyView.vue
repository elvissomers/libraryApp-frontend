<template>
    <div class="AddUser">
      <SideBar></SideBar>
      <AddCopy></AddCopy>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import AddCopy from '@/components/admin-panel/AddCopy.vue';
  import SideBar from '@/components/SideBar.vue';
  
  export default {
    name: 'AddUserView',
    components: {
    SideBar,
    AddCopy
}
  }
  </script>

<style>
.AddCopy {
  display: flex;
  flex-wrap: nowrap;

}
</style>