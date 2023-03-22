<template>
    <div class="UserDetail">

        <UserDetail></UserDetail>


    </div>
</template>
  
<script>
import UserDetail from '@/components/details/UserDetail.vue';
import { store } from '@/store/store'

export default {
    name: 'UserDetailView',
    components: {
        UserDetail
    },
    data() {
        return {
            store
        };
    },
    mounted() {
        this.store.authenticate(this.$router)
    },
}
</script>
  