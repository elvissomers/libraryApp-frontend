<template>
  <div class="flex flex-row justify-between hover:bg-blue-200" :class="[book.archived ? 'bg-slate-300 border-white' : '']">
    <div class="flex flex-row py-4">
      <div class="w-36 ml-8">{{ book.isbn }}</div>
      <div class="w-56">{{ book.author }}</div>
      <div>{{ book.title }}</div>
    </div>

    <div class="flex flex-row">
      <div class="float:right p-4" :class="[book.archived ? 'visible' : 'invisible']" >Gearchiveerd</div>

    <router-link :to="{ name: 'update-book', params: { id: book.id } }" class="hover:text-gray-200">
      <button
        class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Wijzig
      </button>
    </router-link>

    <router-link :to="{ name: 'book-detail', params: { id: book.id } }" class="hover:text-gray-200">
      <button
        class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Bekijk
      </button>
    </router-link>
    
    <button v-on:click="Archive()"
        class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Archiveer
    </button>
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
        if(window.confirm("Weet je zeker dat je dit boek wilt verwijderen?")){
          axios.delete(`http://localhost:8080/book/delete/${id}`)
          .then(response => {
            console.log('Verwijderde boek:', response.data);
            alert('Het boek is verwijderd')
            window.location.reload()
          })
          .catch(error => {
            console.log(error);
          })
        }
        else{
          alert("Het proces is geannuleerd")
        }
        
      },
      Archive(){
      if (confirm("Weet je zeker dat je deze boek wilt archiveren? Het boek kan dan niet meer uitgeleend worden.")){
        axios.put("http://localhost:8080/book/archive/" + this.book.id)
      .then(response => {
        console.log(response.data)
        if (response.data == true){
          alert("Boek " + this.book.title + " is gearchiveerd")
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
          })
        }
      }
    },
}
</script>