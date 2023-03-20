<template>
    <div class="flex flex-row w-fit justify-between hover:bg-slate-300">
        <div class="flex flex-row py-4">
            <div class="w-36 ml-8">{{ copy.number }}</div>
        </div>


        <div class="flex flex-row">
            <router-link :to="{ name: 'user-detail', params: { id: copy.id } }" class="hover:text-gray-200">
                <button
                    class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Toewijzen
                </button>
            </router-link>

        </div>


    </div>
</template>
      
      
<script>

export default {
    name: "CopyRow",
    props: ['copy']
}


</script>