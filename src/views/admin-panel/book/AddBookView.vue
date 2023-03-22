<template>
  <div class="AddBook">
    <SideBar></SideBar>
    <div class="mx-auto">
      <AddBook class="my-20"></AddBook>
    </div>
    
  </div>
</template>
  
<script>
// @ is an alias to /src
import AddBook from '@/components/admin-panel/book/AddBook.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import { store } from '@/store/store'

export default {
  name: 'AddUserView',
  components: {
    SideBar,
    AddBook
  },
  data() {
    return {
      store
    }
  },
  mounted() {
    this.store.authenticate(this.$router)
    this.store.authenticateAdmin(this.$router)
  },
}
</script>

<style>
.AddBook {
  display: flex;
  flex-wrap: nowrap;

}
</style>