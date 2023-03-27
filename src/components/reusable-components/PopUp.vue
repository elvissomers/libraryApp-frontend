<template>
    <div class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">

    <div class="flex flex-col w-fit bg-white p-8 rounded-3xl fixed top-8 border-8 border-green-600">

    <div class="flex flex-col h-80 overflow-y-auto border-2 divide-y-2 mb-4">
        <UsersRowPopup v-for="user in users" :key="user.id" v-bind:user="user"
            @createLoanFromUser="$emit('createLoanFromUser', $event)">
        </UsersRowPopup>
    </div>
</template>