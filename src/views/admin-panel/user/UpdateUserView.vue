<template>
  <div class="UpdateUser">
    <SideBar></SideBar>
    <UpdateUser></UpdateUser>
  </div>
</template>
  
<script>
// @ is an alias to /src
import UpdateUser from '@/components/admin-panel/user/UpdateUser.vue'
import SideBar from '@/components/reusable-components/SideBar.vue'
import { store } from '@/store/store'

export default {
  name: 'AddUserView',
  components: {
    SideBar,
    UpdateUser
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
.UpdateUser {
  display: flex;
  flex-wrap: nowrap;

}
</style>