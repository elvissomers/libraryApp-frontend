<template>
    {{ id }}: {{ endDate }} - {{ startDate }} - {{ userFirstName }} - {{ userLastName }} - {{ bookTitle }}
    
</template>
    
    
    <script>
    export default {
      name: "LoanRow",
        props: ['id', 'startDate', 'endDate', 'userFirstName', 'userLastName', 'bookTitle'] 
    }
    </script>
    
    
    <style>
    </style>