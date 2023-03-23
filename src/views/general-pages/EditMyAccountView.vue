<template>
    <div class="ViewPerson my-20" style="display: grid; grid-template-columns: 1fr 1fr;">
        <Edit_Person></Edit_Person>
    </div>
</template>

<script>
// @ is an alias to /src
import Edit_Person from '@/components/EditPerson.vue';

export default {
    name: 'ViewPerson',
    components: {
        Edit_Person
    }
}
</script>