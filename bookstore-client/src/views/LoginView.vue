<template>
    <div class="Login">
  
        <LoginCard></LoginCard>


    </div>
</template>

<script>
// @ is an alias to /src
import LoginCard from '@/components/LoginCard.vue';

export default {
    name: 'LoginView',
    components: {
        LoginCard
    },
}
</script>