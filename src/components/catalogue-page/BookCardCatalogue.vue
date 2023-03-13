<template>
<div class="min-h-full p-2">
  <div class="bg-white shadow-md rounded-lg min-h-full w-full dark:bg-zinc-800 dark:border-gray-700 ">
    <div class="">
      <router-link :to="{ name: 'book-detail', params: { id: id }}" class="hover:text-gray-200">
        <img class="rounded-t-lg p-8 w-full h-96" :src="require(`@/assets/bookCovers/` + isbn + `.jpg`)"
          alt="product image">
      </router-link>
    </div>
    <div class="px-5 pb-5 ">
      <!-- Title -->
      <router-link :to="{ name: 'book-detail', params: { id: id }}" class="hover:text-gray-200">
        <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white h-16 text-center">{{ title }}</h3>
      </router-link>
    </div>
    <div class="px-5 pb-5 ">
      <!-- Author -->
      <h3 class="text-gray-900 font-normal text-xl tracking-tight dark:text-white text-center align-bottom align-text-bottom">{{ author }}</h3>
    </div>
  </div>
</div>
</template>


<script>
export default {
    name: "BookCardCatalogue",
    props: ['id','title', 'author', 'isbn']
}
</script>


<style></style>