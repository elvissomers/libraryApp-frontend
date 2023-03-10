<template>
    <div class="formbox">
      <h2>User Details</h2>
      <p>ID: {{ user.id }}</p>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Admin: {{ user.admin }}</p>
      <button @click="toggleAdminStatus">Toggle Admin Status</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {}
      };
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        getUsers(){
            axios.get(`http://localhost:8080/user/1`)
            .then( response => {
                console.log(response.data)
                this.user = response.data;
            })
            
        },
        toggleAdminStatus() {
            this.user.admin = !this.user.admin;
            axios.post(`http://localhost:8080/user/1`, { admin: this.user.admin });
      }
    }
  };
  </script>
  