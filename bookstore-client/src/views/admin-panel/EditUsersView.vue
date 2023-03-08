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

      <EditUserButton></EditUserButton>

    

  </div>
</template>

<script>
// @ is an alias to /src
import EditUserButton from '@/components/admin-panel/EditUserButton.vue';
import UserRow from '@/components/admin-panel/UserRow.vue';
import SideBar from '@/components/SideBar.vue';
import axios from 'axios'

export default {
  name: 'EditUserView',
  components: {
    SideBar,
    UserRow,
    EditUserButton
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