<template>
    {{ id }}: {{ firstName }} - {{ lastName }} - {{ eMailAddress }} - {{ admin }} 
    
</template>
    
    
    <script>
    export default {
      name: "LoanRow",
        props: ['id', 'firstName', 'lastName', 'eMailAddress', 'admin'] 
    }
    </script>
    
    
    <style>
    </style>