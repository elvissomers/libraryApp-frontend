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

export default {
  name: 'AddUserView',
  components: {
    SideBar,
    UpdateBook
  }
}
</script>

<style>
.UpdateBook {
  display: flex;
  flex-wrap: nowrap;

}
</style>