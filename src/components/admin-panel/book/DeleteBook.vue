<template>
  <div>
    <input class="bg-blue-500" type="text" v-model="idToDelete">
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
        axios.delete(`http://localhost:8080/book/delete/${this.idToDelete}`)
          .then(response => {
            alert("Boek is verwijderd")
            console.log(response.data);
            this.$router.push('edit-books')
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
</script>
