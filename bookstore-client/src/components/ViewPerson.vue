<template>
    <div>
      <h1>User Details</h1>
      <div v-if="user">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Admin:</strong> {{ user.admin }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>First Name:</strong> {{ user.first_name }}</p>
        <p><strong>Last Name:</strong> {{ user.last_name }}</p>
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
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  </script>
  