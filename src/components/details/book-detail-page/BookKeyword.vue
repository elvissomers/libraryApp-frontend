<template>
    <button class="text-white bg-grey-500 border-0 py-1 px-1 focus:outline-none hover:bg-grey-600 rounded">
        {{ keyword.name }}
    </button>
</template>

<script>
export default {
    props: ['keyword']
}
</script>