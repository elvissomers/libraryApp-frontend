<template>
  <div class="AddUser">
    <SideBar></SideBar>
    <div class="mx-auto">
      <AddUser class="my-28"></AddUser>
    </div>
    
  </div>
</template>
  
<script>
// @ is an alias to /src
import AddUser from '@/components/admin-panel/user/AddUser.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';


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