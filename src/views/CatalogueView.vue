<template>
  <div class="Catalogue my-20">
    <div class="flex flex-row justify-center">
      <SearchBar @doSearch="startSearch($event)" @goBack="goBackToCatalogue()" />
    </div>
    <!-- <div class="flex flex-wrap"> -->
      <BookCardStandardContainer v-if="!this.search"/>
      <BookCardSearchContainer v-if="this.search" :searchTerm="searchTermParent"/>
    <!-- </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/reusable-components/SearchBar.vue'
import BookCardStandardContainer from '@/components/catalogue-page/BookCardStandardContainer.vue';
import BookCardSearchContainer from '@/components/catalogue-page/BookCardSearchContainer.vue';

export default {
  name: 'CatalogueView',
  components: {
    SearchBar,
    BookCardStandardContainer,
    BookCardSearchContainer
  },
  data() {
    return {
      search: false,
      searchTermParent: "",
    }
  },

  methods:{
    startSearch(searchT) {
      this.searchTermParent = searchT
      this.search = true
    },

    goBackToCatalogue() {
      this.search = false
    }
  }
}
</script>