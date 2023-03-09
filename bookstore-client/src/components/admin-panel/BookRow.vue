<template>
    {{ id }}: {{ title }} - {{ author }} - {{ isbn }} 
    
</template>
    
    
<script>
export default {
  name: "BookRow",
    props: ['id', 'title', 'author', 'isbn'] 
}
</script>
    
    
<style>
</style>