<template>
    <div class="MyBooks">
        My books page
        <LoginCard></LoginCard>
        <ElvisLelijkeHtml></ElvisLelijkeHtml>


    </div>
</template>

<script>
// @ is an alias to /src
import ElvisLelijkeHtml from '@/components/lelijke-htmls/ElvisLelijkeHtml.vue';

export default {
  name: 'MyBooksView',
  components: {
    ElvisLelijkeHtml
}
}
</script>