<template>
    <div class="MyBooks">
  
        <LoginCard></LoginCard>


    </div>
</template>

<script>
// @ is an alias to /src
import LoginCard from '@/components/LoginCard.vue';

export default {
  name: 'MyBooksView',
  components: {
    LoginCard
}
}
</script>