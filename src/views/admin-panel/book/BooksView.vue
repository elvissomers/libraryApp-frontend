<template>
  <div class="flex flex-row bg-white">
    <SideBar></SideBar>
    <BookTable class="my-8"></BookTable>
  </div>
</template>

<script>
// @ is an alias to /src
//import ChangeAdminStatus from '@/components/admin-panel/ChangeAdminStatus.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import BookTable from '@/components/admin-panel/book-overview/BookTable.vue';

export default {
  name: 'EditBookView',
  components: {
    SideBar,
    BookTable,
  }
}
</script>