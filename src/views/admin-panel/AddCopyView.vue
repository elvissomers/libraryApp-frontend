<template>
  <div class="AddCopy">
    <SideBar></SideBar>
    <AddCopy class="my-8"></AddCopy>
  </div>
</template>
  
<script>
// @ is an alias to /src
import AddCopy from '@/components/admin-panel/book/AddCopy.vue';
import SideBar from '@/components/reusable-components/SideBar.vue';
import { store } from '@/store/store'

export default {
  name: 'AddUserView',
  components: {
    SideBar,
    AddCopy
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
.AddCopy {
  display: flex;
  flex-wrap: nowrap;

}
</style>