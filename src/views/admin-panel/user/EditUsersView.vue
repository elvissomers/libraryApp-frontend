<template>
  <div class="EditUser flex flex-row">
    <SideBar></SideBar>
    <UserTable class="my-8"></UserTable>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/reusable-components/SideBar.vue';
import UserTable from '@/components/admin-panel/user-overview/UserTable.vue';
import { store } from '@/store/store'

export default {
  name: 'EditUserView',
  components: {
    SideBar,
    UserTable,
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