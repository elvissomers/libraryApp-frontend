<template>
  <div>
    <input type="text" v-model="idToDelete">
    <button @click="deleteData()">Delete</button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        idToDelete: ''
      }
    },
    methods: {
      deleteData() {
        axios.delete(`http://localhost:8080/book/${this.idToDelete}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
</script>
