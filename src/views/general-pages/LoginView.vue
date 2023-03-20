<template>
    <div class="Login my-20">
  
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