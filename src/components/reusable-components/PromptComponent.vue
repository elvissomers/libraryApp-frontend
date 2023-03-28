<template>
    <div class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="flex flex-col w-fit bg-white p-8 rounded-3xl fixed top-32 border-8">

            <div class="w-full mb-4">
                <button v-on:click="this.$emit('closePrompt')" type="button" class="float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="text-xl p-4">
                {{ typePrompt }}
            </div>
            <input
                class="shadow appearance-none border rounded w-96 p-4 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                v-model="fieldValue">

            <button
                class="w-48 self-center text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                @click="$emit('saveField', fieldValue); $emit('closePrompt')">Save
            </button>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src


export default {
    name: 'PromptComponent',
    components: {

    },

    props: ['typePrompt'],

    data() {
        return {
            fieldValue: ''

        };
    },
    mounted() {

    },
    methods: {


    },
}
</script>