<template>
  <div class="EditUser flex flex-row">
    <SideBar></SideBar>
    <UserTable></UserTable>
    <AddUserButton></AddUserButton>
    
  </div>
</template>

<script>
// @ is an alias to /src
//import ChangeAdminStatus from '@/components/admin-panel/ChangeAdminStatus.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import UserTable from '@/components/admin-panel/user-overview/UserTable.vue';
import AddUserButton from '@/components/admin-panel/buttons/AddUserButton.vue';

export default {
  name: 'EditUserView',
  components: {
    SideBar,
    UserTable
    //ChangeAdminStatus
    ,
    AddUserButton
}}
</script>