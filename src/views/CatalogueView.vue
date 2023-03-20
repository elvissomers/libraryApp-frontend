<template>
  <div class="Catalogue my-20">
    <div class="flex flex-row justify-center">
      <SearchBar @doSearch="startSearch($event)" @goBack="goBackToCatalogue()" />
    </div>

    <BookCardStandardContainer v-if="!this.search"></BookCardStandardContainer>
    <BookCardSearchContainer v-if="this.search" :searchTerm="searchTermParent">
    </BookCardSearchContainer>
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
      searchTermParent: ""
    };
  },
  mounted() {
    this.authenticate()
  },
  
  methods:{
    authenticate() {
      if (localStorage.getItem('token') == null ) {
          this.$router.push('login');
          console.log('redirecting to login')
      }
    },
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