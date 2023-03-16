<template>
  <div class="EditUser flex flex-row">
    <SideBar></SideBar>
    <UserTable></UserTable>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/reusable-components/SideBar.vue';
import UserTable from '@/components/admin-panel/user-overview/UserTable.vue';

export default {
  name: 'EditUserView',
  components: {
    SideBar,
    UserTable,
  }
}
</script>