<template>
<!-- This is an example component -->
<!-- This is an example component -->
<div class='flex items-center justify-center'>
  <div class="flex justify-center items-center space-x-4">
    <button v-on:click="decreasePage()" class="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm">
    <span class="material-symbols-outlined">arrow_left</span>
    </button>
    <div class="text-slate-500">{{ curPage + 1 }}/{{ totalPages }}</div>
    <button v-on:click="increasePage()" class="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm">
        <span class="material-symbols-outlined">arrow_right</span>
    </button>
  </div>
</div>
  </template>

  <script>
export default {
  name: 'PaginationBar',
  props: ['curPage', 'totalPages'],

  data() {
    return {
      searchText: ''
    };
  },

  methods:{
    increasePage()
    {

        this.$emit('changePage', 1)
    },
    decreasePage()
    {
        this.$emit('changePage', -1)
    }



  }
};
</script>