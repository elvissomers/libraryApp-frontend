<template>
    <div class="flex flex-row py-2 border-b-2">
      <div class="flex-grow-0 w-10 text-center">
        {{ book.isbn }}
      </div>
      <div class="flex-grow pl-4">
        <div class="font-bold">{{ book.title }}</div>
        <div class="text-sm text-gray-700">{{ book.author }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookRowPopup',
    props: {
      book: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  