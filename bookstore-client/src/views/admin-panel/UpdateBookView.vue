<template>
    <div class="UpdateBook">
      <SideBar></SideBar>
      <UpdateBook></UpdateBook>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
    import UpdateBook from '@/components/admin-panel/UpdateBook.vue';
    import SideBar from '@/components/SideBar.vue';
  
  export default {
    name: 'AddUserView',
    components: {
    SideBar,
    UpdateBook
}
  }
  </script>

<style>
.UpdateBook {
  display: flex;
  flex-wrap: nowrap;

}
</style>