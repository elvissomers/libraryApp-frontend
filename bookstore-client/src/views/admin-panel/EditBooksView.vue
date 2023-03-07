

<template>
  <div class="EditBooks">
    <SideBar></SideBar>
    <EditBooks></EditBooks>
    <DeleteBook></DeleteBook>

  </div>
</template>

<script>
// @ is an alias to /src
import EditBooks from '@/components/admin-panel/EditBooks.vue';
import SideBar from '@/components/SideBar.vue';
import DeleteBook from '@/components/admin-panel/DeleteBook.vue'

export default {
  name: 'EditBooksView',
  components: {
    SideBar,
    EditBooks,
    DeleteBook
}
}
</script>

<style>
.EditBooks {
display: flex;
flex-wrap: nowrap;

}
</style>