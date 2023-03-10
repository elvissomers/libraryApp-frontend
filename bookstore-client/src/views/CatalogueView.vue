<template>
    <div class="Catalogue">
      <SearchBar @doSearch="startSearch($event)" />
        <!--<div class="flex flex-row flex-wrap justify-center">-->
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
      console.log(this.searchTermParent)
    }
  }
}
</script>