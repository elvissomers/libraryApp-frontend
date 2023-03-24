<template>
    <div class="ChangePasswordView my-20">
        <ResetPassword></ResetPassword>
    </div>
</template>

<script>
import ResetPassword from '@/components/reusable-components/ResetPassword.vue';

export default {
    name: 'ChangePasswordView',
    components: {
        ResetPassword
}
}
</script>