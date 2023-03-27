<template>
    <div class="max-w-xs rounded-lg overflow-hidden shadow-md bg-white">
        <!-- <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> -->
        <router-link :to="{ name: 'book-detail', params: { id: reservation.bookId } }" class="hover:text-gray-200">
                <img class="rounded-t-lg p-8 w-full h-96"
                    v-bind:src="require(`@/assets/bookCovers/` + reservation.bookIsbn + `.jpg`)"
                    alt="product image">
            </router-link>
        <div class="px-6 py-4">
            <router-link :to="{ name: 'book-detail', params: { id: reservation.bookId } }" class="hover:text-gray-200">
                <p class="font-bold text-xl mb-2  h-16">"{{ reservation.bookTitle }}</p>
            </router-link>
            <p class="text-gray-700 text-base">Auteur: {{ reservation.bookAuthor }}</p>
            <p class="text-gray-700 text-base">ISBN: {{ reservation.bookIsbn }}</p>
            <p class="text-gray-700 text-base">Gereserveerd sinds: {{ reservation.date }}</p>
        </div>
    </div>
</template>


<script>
export default {
  name: "ReservationCard",
    // props: ['id','title', 'author', 'isbn'] 
    props: ['reservation']
}
</script>


<style>
</style>