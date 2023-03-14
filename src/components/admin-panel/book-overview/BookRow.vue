<template>
    
  <div>
    
    <!-- bookdetail -->
    <router-link :to="{ name: 'book-detail', params: { id: id }}" class="hover:text-gray-200">
      {{ id }}: {{ title }} - {{ author }} - {{ isbn }} 
    </router-link> 

    <!-- delete book button -->
      <button class="bg-black text-slate-50" 
      @click="deleteBook(id)">Delete</button>

      <!-- edit book button -->
    <router-link :to="{ name: 'update-book', params: { id: id }}" class="hover:text-gray-200">
      <button class="bg-black text-slate-50">Wijzig</button>
    </router-link>

  </div>
</template>
    
<script>
import axios from 'axios';

export default {
  name: "BookRow",
    props: ['id', 'title', 'author', 'isbn'],
    methods: {
      deleteBook(id) {

        axios.delete(`http://localhost:8080/book/${id}`)
          .then(response => {
            console.log('Book deleted:', response.data);
            alert('Book has been deleted')
            window.location.reload()
            // Remove the deleted book from the books array
          })
          .catch(error => {
            console.log(error);
          })
      },
    },
}
</script>





    
<style>
</style>