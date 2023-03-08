<template>
    <h1>Beheer boeken</h1>
    <button>

        <router-link to="/admin/add-book" class="flex items-center space-x-1 rounded-md px-2 py-3 border-neutral-900 border-2 hover:bg-gray-100 hover:text-blue-600">
            <!-- <span class="material-symbols-outlined">library_add</span> -->
            <span class="material-symbols-outlined">library_books</span>
            <span>Boek toevoegen</span>
        </router-link>

    </button>

    <button>

        <router-link to="/admin/add-copy" class="flex items-center space-x-1 rounded-md px-2 py-3 border-neutral-900 border-2 hover:bg-gray-100 hover:text-blue-600">
            <span class="material-symbols-outlined">import_contacts</span>
            <span>Examplaar toevoegen</span>
        </router-link>

    </button>
    
</template>