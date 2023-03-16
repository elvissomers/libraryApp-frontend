<template>
  <div class="flex flex-row justify-between hover:bg-slate-300">
    <div class="flex flex-row py-4">
      <div class="w-36 ml-8">{{ book.isbn }}</div>
      <div class="w-56">{{ book.author }}</div>
      <div>{{ book.title }}</div>
    </div>

    <div class="flex flex-row">
    <router-link :to="{ name: 'update-book', params: { id: book.id } }" class="hover:text-gray-200">
      <button
        class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Wijzig
      </button>
    </router-link>

    <button class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" 
      @click="deleteBook(book.id)">Delete</button>

    <router-link :to="{ name: 'book-detail', params: { id: book.id } }" class="hover:text-gray-200">
      <button
        class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Bekijk
      </button>
    </router-link>
  </div>


  </div>
</template>
    
    
<script>
import axios from 'axios';

export default {
  name: "BookRow",
  props: ['book'],

    methods: {
      deleteBook(id) {

        axios.delete(`http://localhost:8080/book/delete/${id}`)
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