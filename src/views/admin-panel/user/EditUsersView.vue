<template>
  <div class="EditUser flex flex-row">
    <SideBar></SideBar>
    <div class="grid-container">
      <AddUserButton></AddUserButton>
      <UserTable></UserTable>
    </div>
    
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/reusable-components/SideBar.vue';
import UserTable from '@/components/admin-panel/user-overview/UserTable.vue';
import AddUserButton from '@/components/admin-panel/buttons/AddUserButton.vue';

export default {
  name: 'EditUserView',
  components: {
    SideBar,
    UserTable,
    AddUserButton
}}
</script>