<template>
    <button class="text-white bg-slate-400 border-0 py-1 px-2 m-1 rounded-md">
        {{ keyword }}
    </button>
</template>

<script>
export default {
    props: ['keyword']
}
</script>