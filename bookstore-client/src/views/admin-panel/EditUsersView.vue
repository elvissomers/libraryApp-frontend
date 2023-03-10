<template>
  <div class="EditUser">
    <SideBar></SideBar>
    
        <div class="flex flex-row flex-wrap justify-center">
          All Users:
            <UserRow
            v-for="user in users" :key="user.id"
            v-bind:id="user.id" 
            v-bind:firstName="user.firstName" 
            v-bind:lastName="user.lastName" 
            v-bind:eMailAddress="user.eMailAddress"
            v-bind:admin="user.admin">
            </UserRow>
        </div>
      <!--<ChangeAdminStatus></ChangeAdminStatus>-->
      <AddUserButton></AddUserButton>

    

  </div>
</template>

<script>
// @ is an alias to /src
import AddUserButton from '@/components/admin-panel/AddUserButton.vue';
import UserRow from '@/components/admin-panel/UserRow.vue';
//import ChangeAdminStatus from '@/components/admin-panel/ChangeAdminStatus.vue';
import SideBar from '@/components/SideBar.vue';
import axios from 'axios'

export default {
  name: 'EditUserView',
  components: {
    SideBar,
    UserRow,
    AddUserButton,
    //ChangeAdminStatus
}, 
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios.get('http://localhost:8080/user')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
}
</script>

<style>
.EditUser {
display: flex;
flex-wrap: nowrap;

}
</style>