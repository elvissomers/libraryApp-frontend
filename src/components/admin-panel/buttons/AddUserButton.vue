<template>
    <!-- <button>
        <router-link to="/admin/add-user" class="flex items-center space-x-1 rounded-md px-2 py-3 border-neutral-900 border-2 hover:bg-gray-100 hover:text-blue-600">
            <span class="material-symbols-outlined">person_add</span>
            <span>Gebruiker toevoegen</span>
        </router-link>

    </button> -->

    <!-- <button class="flex text-white bg-lime-500 border-0 py-2 px-3 h-fit focus:outline-none hover:bg-lime-600 rounded">
        <router-link to="/admin/add-user">
          <span class="material-symbols-outlined">person_add</span>
        </router-link>
    </button> -->

    <button class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-lime-500  hover:bg-lime-600 rounded-md h-fit" title="Add user">
        <router-link to="/admin/add-user">
            <span class="material-symbols-outlined">person_add</span>
        </router-link>
    </button>

</template>