<template>
  <div class="UpdateBook">
    <SideBar></SideBar>
    <UpdateBook class=""></UpdateBook>
  </div>
</template>
  
<script>
// @ is an alias to /src
import UpdateBook from '@/components/admin-panel/book/UpdateBook.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import { store } from '@/store/store'

export default {
  name: 'AddUserView',
  components: {
    SideBar,
    UpdateBook
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
.UpdateBook {
  display: flex;
  flex-wrap: nowrap;

}
</style>