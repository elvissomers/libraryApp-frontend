<template>
  <div style="max-width:700px;">

    <form class="flex items-center">
      <label for="search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <!-- removed: dark:text-gray-400 -->
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
        <!-- removed: dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 -->
        <input v-model="searchText" type="text" id="search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 p-2.5"
          :placeholder="placeholder" required="false">
        <button v-on:click="backToCatalogue()" type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 transition ease-in-out delay-50 hover:scale-125 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>

      <!-- removed: dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 -->
      <button v-on:click="sendSearchTerm()" type="submit"
        class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-lime-500 border border-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition ease-in-out delay-50 hover:scale-110 duration-300 rounded-md">
        <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>Search
      </button>
    </form>
  </div>
</template>

<script>


export default {
  name: 'SearchBar',

  data() {
    return {
      searchText: '',
    };
  },

  props: ['placeholder'],

  methods: {

    sendSearchTerm() {
      this.$emit('doSearch', this.searchText)
    },

    backToCatalogue() {
      this.searchText = ''
      this.$emit('goBack')
    }


  }
};
</script>