<template>
    <div class="AddUser">
      <AddUser></AddUser>
      test
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import AddUser from '@/components/admin-panel/AddUser.vue';
  
  export default {
    name: 'AddUserView',
    components: {
    AddUser
}
  }
  </script>