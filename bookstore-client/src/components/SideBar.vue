<template>

<!-- page -->
<!-- removed: min-h-screen w-full -->
<main class=" bg-gray-100 text-gray-700" x-data="layout">

    <div class="flex">
        <!-- aside -->
        <aside class=" flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style="height: 100vh"
        x-show="asideOpen">
            <router-link to="/admin/edit-users" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:light-green">
                <span class="material-symbols-outlined">group</span>
                <span>Gebruikers beheren</span>
            </router-link>

            <router-link to="/admin/edit-books" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:light-green">
                <!-- <span class="material-symbols-outlined">library_books</span> -->
                <span class="material-symbols-outlined">menu_book</span>
                <span>Boeken beheren</span>
            </router-link>

            <router-link to="/admin/requests" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:light-green">
                <span class="material-symbols-outlined">thumbs_up_down</span>
                <span>Leenverzoeken</span>
            </router-link>

            <router-link to="/admin/loans" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:light-green">
                <span class="material-symbols-outlined">collections_bookmark</span>
                <span>Uitgeleende boeken</span>
            </router-link>

            <router-link to="/admin/reservations" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:light-green">
                <span class="material-symbols-outlined">pending_actions</span>
                <span>Reservaties</span>
            </router-link>
        </aside>
    </div>
</main>
</template>



<script>
</script>

<style scoped>
</style>