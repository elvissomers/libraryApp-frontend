<template>
  <div class="flex flex-row justify-between hover:bg-slate-300">
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
    <router-link :to="{ name: 'user-detail', params: { id: user.id } }" class="hover:text-gray-200">
      <button
        class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Bekijk
      </button>
    </router-link>

  </div>


  </div>
</template>
    
    
<script>

export default {
  name: "UserRow",
  props: ['user']
}


</script>
    