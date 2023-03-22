<template>
    <div class="ViewPerson my-20" style="display: grid; grid-template-columns: 1fr 1fr;">
        <View_Person></View_Person>
        <Edit_Person></Edit_Person>
    </div>
</template>

<script>
// @ is an alias to /src
import View_Person from '@/components/details/ViewPerson.vue';
import Edit_Person from '@/components/EditPerson.vue';
import { store } from '@/store/store'

export default {
    name: 'ViewPerson',
    components: {
        View_Person,
        Edit_Person
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