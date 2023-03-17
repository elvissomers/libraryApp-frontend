<template>
    <div>
      <h1>User Details</h1>
      <input class="bg-blue-500" type="text" v-model="viewPersonId">
      <button @click="getUserDetails()">get data</button>
      <br>
      <div v-if="personDetails">
        <p><strong>ID:</strong> {{ personDetails.id }}</p>
        <p><strong>Admin:</strong> {{ personDetails.admin }}</p>
        <p><strong>Email:</strong> {{ personDetails.emailAddress }}</p>
        <p><strong>First Name:</strong> {{ personDetails.firstName }}</p>
        <p><strong>Last Name:</strong> {{ personDetails.lastName }}</p>
      </div>
      <div v-else>
        <p>Loading user details unsuccessful...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        viewPersonId: '',
        personDetails: []
      };
    },
    methods: {
      getUserDetails(){
        axios.get(`http://localhost:8080/user/get/${this.viewPersonId}`)
        .then(response => {
          this.personDetails = response.data;
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  };
  </script>
  