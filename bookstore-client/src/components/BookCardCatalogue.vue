<template>
<!-- component, removed: mx-auto-->
<div class="min-h-full p-2">
    <div class="bg-white shadow-md rounded-lg min-h-full w-full dark:bg-zinc-800 dark:border-gray-700">
        <!-- Image -->
        <a href="#">
            <!-- <img class="rounded-t-lg p-8" src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp" alt="product image"> -->
            <img class="rounded-t-lg p-8" :src="require(`@/assets/bookCovers/`+ isbn + `.jpg` )" alt="product image">
        </a>
        
        <div class="px-5 pb-5">
            <!-- Title -->
            <a href="#">
                <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{{ title }}</h3>
            </a>
            <!-- Author -->
            <h3 class="text-gray-900 font-normal text-xl tracking-tight dark:text-white">{{ author }}</h3>
        </div>
    </div>
</div>

</template>


<script>
export default {
  name: "BookCardCatalogue",
    props: ['title', 'author', 'isbn'] 
}
</script>


<style>
</style>