<template>
    {{ id }} - {{ date }} - {{  userFirstName }} - {{ userLastName }} - {{ bookTitle }}
    
    
</template>
    
    
    <script>
    export default {
      name: "ReservationRow",
        props: ['id', 'date', 'userFirstName', 'userLastName', 'bookTitle'] 
    }
    </script>
    
    
    <style>
    </style>