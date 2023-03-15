<template>
  <div class="EditUser flex flex-ro">
    <SideBar></SideBar>
    <BookTable></BookTable>
    <AddBookButton></AddBookButton>
    <AddCopyButton></AddCopyButton>
  </div>
</template>

<script>
// @ is an alias to /src
//import ChangeAdminStatus from '@/components/admin-panel/ChangeAdminStatus.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import BookTable from '@/components/admin-panel/book-overview/BookTable.vue';
import AddBookButton from '@/components/admin-panel/buttons/AddBookButton.vue';
import AddCopyButton from '@/components/admin-panel/buttons/AddCopyButton.vue';

export default {
  name: 'EditBookView',
  components: {
    SideBar,
    BookTable,
    AddCopyButton
    //ChangeAdminStatus
    ,
    AddBookButton
}}
</script>