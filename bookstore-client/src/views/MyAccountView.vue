<template>
    <div class="ViewPerson">
        <View_Person></View_Person>
    </div>
</template>

<script>
// @ is an alias to /src
import View_Person from '@/components/ViewPerson.vue';

export default {
  name: 'ViewPerson',
  components: {
    View_Person
    }
}
</script>