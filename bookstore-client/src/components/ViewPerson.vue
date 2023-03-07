<template>
    <div>
      <h1>User Details</h1>
      <div v-if="user">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Admin:</strong> {{ user.admin }}</p>
        <p><strong>Email:</strong> {{ user.eMailAddress }}</p>
        <p><strong>First Name:</strong> {{ user.firstName }}</p>
        <p><strong>Last Name:</strong> {{ user.lastName }}</p>
      </div>
      <div v-else>
        <p>Loading user details...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null
      };
    },
    mounted() {
      const id = 1;
      axios.get(`http://localhost:8080/user/${id}`)
        .then(response => {
          this.user = response.data;
          console.log(this.user)
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  </script>
  