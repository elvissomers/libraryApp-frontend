<template>
  <div class="flex flex-row justify-between hover:bg-blue-200">
    <div class="flex flex-row py-4">
      <div class="w-36 ml-8">{{ user.firstName }}</div>
      <div class="w-56">{{ user.lastName }}</div>
      <div class="">{{ user.emailAddress }}</div>
    </div>


  <div class="flex flex-row">
    <router-link :to="{ name: 'update-user', params: { id: user.id } }" class="hover:text-gray-200">
      <button
        class="text-white float-right bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Wijzig
      </button>
    </router-link>
    <router-link :to="{ name: 'user-detail', params: { id: user.id }, query: {parent: 'UserRow'} }" class="hover:text-gray-200">
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
  name: "UserRow",
  props: ['user'],

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
    