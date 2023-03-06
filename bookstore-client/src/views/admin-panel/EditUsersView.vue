<template>
  <div class="EditUser">
    <SideBar></SideBar>
    <EditUsers></EditUsers>

  </div>
</template>

<script>
// @ is an alias to /src
import EditUsers from '@/components/admin-panel/EditUsers.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'EditUserView',
  components: {
    SideBar,
    EditUsers
}
}
</script>

<style>
.EditUser {
display: flex;
flex-wrap: nowrap;

}
</style>