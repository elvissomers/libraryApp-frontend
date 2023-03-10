<template>
    <div class="ViewPerson" style="display: grid; grid-template-columns: 1fr 1fr;">
        <View_Person></View_Person>
        <Edit_Person></Edit_Person>
    </div>
</template>

<script>
// @ is an alias to /src
import View_Person from '@/components/ViewPerson.vue';
import Edit_Person from '@/components/EditPerson.vue';

export default {
  name: 'ViewPerson',
  components: {
    View_Person,
    Edit_Person
    }
}
</script>