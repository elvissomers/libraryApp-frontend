<template>

  <div class="p-2 bg-white shadow-lg rounded-lg relative aspect-square">
    <!-- removed: dark:bg-zinc-800 dark:border-gray-700 -->
<div class="shadow-inner ">
    <router-link :to="{ name: 'book-detail', params: { id: id } }" class="hover:text-gray-200">
      <img class="rounded-t-lg p-8 w-full h-96" :src="require(`@/assets/bookCovers/` + isbn + `.jpg`)"
        alt="product image">
    </router-link>
    <div class="px-5 pb-5 ">
      <!-- Title -->
      <!-- removed: dark:text-white -->
      <router-link :to="{ name: 'book-detail', params: { id: id } }" class="hover:text-gray-200">
        <h3 class="text-gray-900 font-semibold text-xl tracking-tight h-16 text-center">{{ truncatedTitle }}</h3>
      </router-link>
    </div>
    <div class="px-5 pb-5 ">
      <!-- Author -->
      <!-- removed: dark:text-white -->
      <h3 class="text-gray-900 font-normal text-xl tracking-tight text-center align-bottom align-text-bottom">{{ author
      }}</h3>
    </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "BookCardCatalogue",
  props: ['id', 'title', 'author', 'isbn'],
  computed: {
    truncatedTitle() {
      if (this.title.length > 50) {
        return this.title.substring(0, 50) + '...';
      } else {
        return this.title;
      }
    },
  },
}
</script>


<style></style>