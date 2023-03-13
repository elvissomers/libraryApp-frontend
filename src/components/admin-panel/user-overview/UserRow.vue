<template>
  <router-link :to="{ name: 'user-detail', params: { id: id }}" class="hover:text-gray-200">
    {{ id }}: {{ firstName }} - {{ lastName }} - {{ eMailAddress }} - {{ admin }}
  </router-link>
    
</template>
    
    
    <script>
    export default {
      name: "LoanRow",
        props: ['id', 'firstName', 'lastName', 'eMailAddress', 'admin'] 
    }
    </script>
    
    
    <style>
    </style>