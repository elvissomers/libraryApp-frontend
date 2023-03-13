<template>
    <div class="Catalogue bg-slate-100">
      <SearchBar 
      @doSearch="startSearch($event)"
      @goBack="goBackToCatalogue()" />

      <BookCardStandardContainer v-if="!this.search"></BookCardStandardContainer>      
      <BookCardSearchContainer
       v-if="this.search"
       :searchTerm="searchTermParent">
      </BookCardSearchContainer>
    </div>
  </template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import BookCardStandardContainer from '@/components/BookCardStandardContainer.vue';
import BookCardSearchContainer from '@/components/BookCardSearchContainer.vue';

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
      searchTermParent: ""
    };
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