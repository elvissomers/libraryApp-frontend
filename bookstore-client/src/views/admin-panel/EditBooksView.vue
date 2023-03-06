

<template>
  <div class="EditBooks">
    <SideBar></SideBar>
    <EditBooks></EditBooks>

  </div>
</template>

<script>
// @ is an alias to /src
import EditBooks from '@/components/admin-panel/EditBooks.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'EditBooksView',
  components: {
    SideBar,
    EditBooks
}
}
</script>

<style>
.EditBooks {
display: flex;
flex-wrap: nowrap;

}
</style>