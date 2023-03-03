<template>
    <div class="Requests">
  
        <LoginCard></LoginCard>


    </div>
</template>

<script>
// @ is an alias to /src
import LoginCard from '@/components/LoginCard.vue';

export default {
  name: 'RequestsView',
  components: {
    LoginCard
}
}
</script>