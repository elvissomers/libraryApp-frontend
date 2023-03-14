<template>
  <div class="EditUser flex flex-ro">
    <SideBar></SideBar>
    <UserTable></UserTable>
  </div>
</template>

<script>
// @ is an alias to /src
//import ChangeAdminStatus from '@/components/admin-panel/ChangeAdminStatus.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import UserTable from '@/components/admin-panel/user-overview/UserTable.vue';

export default {
  name: 'EditUserView',
  components: {
    SideBar,
    UserTable
    //ChangeAdminStatus
}}
</script>