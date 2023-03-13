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
}
  }
  </script>

<style>
.AddBook {
  display: flex;
  flex-wrap: nowrap;

}
</style>