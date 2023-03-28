<template>
  <div class="flex flex-row justify-between hover:bg-blue-200">
    <router-link :to="{ name: 'user-detail', params: { id: user.id }, query: {parent: 'UserRow'} }" >
      <div class="flex flex-row py-4">
        
          <div class="w-36 ml-8 hover:text-lime-500">{{ user.firstName }}</div>
          <div class="w-56 hover:text-lime-500">{{ user.lastName }}</div>
          <div class="hover:text-lime-500">{{ user.emailAddress }}</div>
        
      </div>
    </router-link>


  <div class="flex flex-row">
    <button v-on:click="this.$emit('showBookPopup', user)"
      class="float-right text-white bg-blue-500 px-3 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
      <span>
        +
      </span>
      <span class="material-symbols-outlined align-middle ">
        menu_book
        <!-- assignment_add -->
      </span>
    </button>

    <router-link :to="{ name: 'update-user', params: { id: user.id } }" class="hover:text-gray-200">
      <button
        class="text-white float-right bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Wijzig
      </button>
    </router-link>
    <!-- <router-link :to="{ name: 'user-detail', params: { id: user.id }, query: {parent: 'UserRow'} }" class="hover:text-gray-200">
      <button
        class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Bekijk
      </button>
    </router-link> -->
    <button v-on:click="Archive()"
        class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
        :class="[user.id != parseInt(store.state.userId) ? 'bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300' : 'bg-gray-400 cursor-not-allowed hover:bg-gray-600 hover:scale-100 hover:-translate-y-0']"
        :disabled="user.id == parseInt(store.state.userId)">
        {{ user.id != parseInt(store.state.userId) ? 'Archiveren!' : 'Archiveren!' }}
      </button>
    <!--<button v-on:click="showCopies()" class="text-white float-right px-4 py-2 m-2 h-fit rounded-md w-48"
      :class="[reservation.available ? 'bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300' : 'bg-gray-400 cursor-not-allowed']"
      :disabled="!reservation.available">
      {{ reservation.available ? 'Goedkeuren!' : 'Niet Beschikbaar' }}
    </button>-->

  </div>


  </div>
</template>
    
    
<script>
import axios from 'axios';
import store from '@/store';

export default {
  name: "UserRow",
  props: ['user'],
  data(){
    return{
      store
    }
  },
  

  methods: {
    Archive(){
      if (confirm("Weet je zeker dat je deze user wilt archiveren? De gegevens zullen niet meer opgehaald kunnen worden.")){
        axios.put("http://localhost:8080/user/archive/" + this.user.id)
      .then(response => {
        console.log(response.data)
        if (response.data == true){
          alert("Gebruiker " + this.user.firstName + " is gearchiveerd")
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
        })
      }
    }
  }
}


</script>


