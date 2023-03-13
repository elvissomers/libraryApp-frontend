<template>
<!-- component, removed: mx-auto-->
<div class="max-w-lg p-2">
    <div class="bg-white shadow-md rounded-lg max-w-xs dark:bg-zinc-800 dark:border-gray-700">
        <!-- Image -->
        <a href="#">
            <!-- <img class="rounded-t-lg p-8" src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp" alt="product image"> -->
            <img class="rounded-t-lg p-8" src="https://media.npr.org/assets/img/2022/09/29/hero_custom-e3bbfda6925dc773b27ec4026ad5e8cf93019072-s1100-c50.jpg" alt="product image">
        </a>
        
        <div class="px-5 pb-5">
            <!-- Title -->
            <a href="#">
                <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">"{{ title }}</h3>
            </a>
            <!-- Author -->
            <h3 class="text-gray-900 font-normal text-xl tracking-tight dark:text-white">{{ author }}</h3>
            <h3 class="text-gray-900 font-normal text-xl tracking-tight dark:text-white">{{ isbn }}</h3>
            <!-- Start date -->
            <h3 class="text-gray-900 font-normal text-xl tracking-tight dark:text-white">Geleend sinds: 21-02-2021</h3>
            <!-- End date? -->
        </div>
    </div>
</div>

</template>


<script>
export default {
  name: "BookCard",
    props: ['title', 'author', 'isbn'] 
}
</script>


<style>
</style>