<template>

    <div class="p-2 bg-white shadow-lg rounded-lg relative aspect-square">
    <div class="shadow-inner">
        <!-- <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> -->
        <router-link :to="{ name: 'book-detail', params: { id: loan.bookId } }" class="hover:text-gray-200">
                <img v-if="bookCoverExists" class="rounded-t-lg p-8 w-full h-96"
                v-bind:src="require(`@/assets/bookCovers/` + loan.bookIsbn + `.jpg`)"
                    alt="product image">
                    <div v-if="!bookCoverExists" class="rounded-t-lg p-8 w-full h-96 flex items-center justify-center">Plaatje niet beschikbaar</div>
            </router-link>
        <div class="px-6 py-4">
            <router-link :to="{ name: 'book-detail', params: { id: loan.bookId } }" class="hover:text-gray-200">
                <p class="font-bold text-xl mb-2 h-16">{{ truncatedTitle }}</p>
            </router-link>
            <p class="text-gray-700 text-base">Auteur: {{ loan.bookAuthor }}</p>
            <p class="text-gray-700 text-base">ISBN: {{ loan.bookIsbn }}</p>
            <p class="text-gray-700 text-base">Geleend sinds: {{ loan.startDate }}</p>
            <p class="text-gray-700 test-base">Terug gebracht op: {{ loan.endDate }}</p>
            <p class="text-gray-700 text-base">Exemplaar: {{ loan.copyNumber }}</p>
            </div>

        </div>
    </div>
    
</template>


<script>
export default {
    name: "BookCard",
    // props: ['id','title', 'author', 'isbn'] 
    props: ['loan'],
    computed: {
    truncatedTitle() {
      if (this.loan.bookTitle.length > 30) {
        return this.loan.bookTitle.substring(0, 30) + '...';
      } else {
        return this.loan.bookTitle;
      }
    },
    bookCoverExists() {
      try {
        require(`@/assets/bookCovers/${this.loan.bookIsbn}.jpg`);
        return true;
      } catch (e) {
        return false;
      }
    }
  },
}
</script>


<style></style>