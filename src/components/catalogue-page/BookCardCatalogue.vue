<template>
  <!-- <div class="min-h-full p-2"> -->
    <!-- removed: dark:bg-zinc-800 dark:border-gray-700 min-h-full w-full-->
    <div class="bg-white shadow-lg rounded-lg m-4 overflow-hidden ">
      <div class="shadow-inner ">
        <router-link :to="{ name: 'book-detail', params: { id: id }}" class="hover:text-gray-200">
          <img class="rounded-t-lg p-8 w-full h-96" :src="require(`@/assets/bookCovers/` + isbn + `.jpg`)"
            alt="product image">
        </router-link>
      
        <div class="px-3 pb-3 ">
          <!-- Title -->
          <!-- removed: dark:text-white -->
          <router-link :to="{ name: 'book-detail', params: { id: id }}" class="hover:text-gray-200">
            <h3 class="text-gray-900 font-semibold text-xl tracking-tight h-16 text-center">{{ title }}</h3>
          </router-link>
        </div>
        <div class="px-3 pb-3 ">
          <!-- Author -->
          <!-- removed: dark:text-white -->
          <h3 class="text-gray-900 font-normal text-xl tracking-tight text-center align-bottom align-text-bottom">{{ author }}</h3>
        </div>
      </div>
    </div>
  <!-- </div> -->
  </template>


<script>
export default {
    name: "BookCardCatalogue",
    props: ['id','title', 'author', 'isbn']
}
</script>


<style></style>