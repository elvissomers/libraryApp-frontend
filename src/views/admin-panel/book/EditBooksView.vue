<template>
  <div class="flex flex-row">
    <SideBar></SideBar>
    <BookTable class="my-8"></BookTable>
  </div>
</template>

<script>
// @ is an alias to /src
//import ChangeAdminStatus from '@/components/admin-panel/ChangeAdminStatus.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import BookTable from '@/components/admin-panel/book-overview/BookTable.vue';
import { store } from '@/store/store'

export default {
  name: 'EditBookView',
  components: {
    SideBar,
    BookTable,
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