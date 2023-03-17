<template>
<!-- component, removed: mx-auto-->
<div class="max-w-lg p-2">
    <!-- removed: dark:bg-zinc-800 dark:border-gray-700 -->
    <div class="bg-white shadow-md rounded-lg max-w-xs">
        <!-- Image -->
        <router-link :to="{ name: 'book-detail', params: { id: reservation.bookId }}" class="hover:text-gray-200">
            <!-- <img class="rounded-t-lg p-8" src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp" alt="product image"> -->
            <img class="rounded-t-lg p-8" src="https://media.npr.org/assets/img/2022/09/29/hero_custom-e3bbfda6925dc773b27ec4026ad5e8cf93019072-s1100-c50.jpg" alt="product image">
        </router-link>
        
        <div class="px-5 pb-5">
            <!-- removed: dark:text-white -->
            <!-- Title -->
            <router-link :to="{ name: 'book-detail', params: { id: reservation.bookId }}" class="hover:text-gray-200">
                <h3 class="text-gray-900 font-semibold text-xl tracking-tight">"{{ reservation.bookTitle }}</h3>
            </router-link>
            <!-- Author -->
            <h3 class="text-gray-900 font-normal text-xl tracking-tight">{{ reservation.bookAuthor }}</h3>
            <h3 class="text-gray-900 font-normal text-xl tracking-tight">{{ reservation.bookIsbn }}</h3>
            <!-- Start date -->
            <h3 class="text-gray-900 font-normal text-xl tracking-tight">Geleend sinds: {{ reservation.startDate }}</h3>
            <h3 class="text-gray-900 font-normal text-xl tracking-tight">Exemplaar: {{ reservation.copyNumber }}</h3>
            <!-- End date? -->
        </div>
    </div>
</div>

</template>


<script>
export default {
  name: "BookCard",
    // props: ['id','title', 'author', 'isbn'] 
    props: ['reservation']
}
</script>


<style>
</style>