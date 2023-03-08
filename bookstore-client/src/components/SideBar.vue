<template>

<!-- page -->
<!-- removed: min-h-screen w-full -->
<main class=" bg-gray-100 text-gray-700" x-data="layout">

    <div class="flex">
        <!-- aside -->
        <!-- removed: -->
        <aside class=" flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style="height: 100vh"
        x-show="asideOpen">
            <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <router-link to="/admin/edit-users">
                <span class="text-2xl"><i class="bx bx-home"></i></span>
                <span>Gebruikers beheren</span>
                </router-link>
            </a>

            <!-- <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    <li><a class="hover:text-gray-200" href="#"><router-link to="/">Home</router-link></a></li>
                    <li><a class="hover:text-gray-200" href="#"><router-link to="/mybooks">My Books</router-link></a></li>
                    <li><a class="hover:text-gray-200" href="#"><router-link to="/admin/add-user">Admin panel</router-link></a></li>
                </ul> -->

            <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <router-link to="/admin/edit-books">
                <span class="text-2xl"><i class="bx bx-cart"></i></span>
                <span>Boeken beheren</span>
                </router-link>
            </a>

            <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <router-link to="/admin/requests">
                <span class="text-2xl"><i class="bx bx-cart"></i></span>
                <span>Leenverzoeken</span>
                </router-link>
            </a>
            <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <!-- <router-link to="/admin/edit-users"></router-link> -->
                <span class="text-2xl"><i class="bx bx-cart"></i></span>
                <span>Uitgeleende boeken</span>
            </a>
            <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span class="text-2xl"><i class="bx bx-cart"></i></span>
                <span>Reserveringen</span>
            </a>
            <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <router-link to="/admin/createLoan">
                <span class="text-2xl"><i class="bx bx-cart"></i></span>
                <span>Creëer lening van Reservering</span>
                </router-link>
            </a>

            <!-- <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span class="text-2xl"><i class="bx bx-shopping-bag"></i></span>
                <span>Creeer nieuwe gebruiker</span>
            </a> -->

            <!-- <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span class="text-2xl"><i class="bx bx-heart"></i></span>
                <span>My Favourite</span>
            </a>

            <a href="#" class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span class="text-2xl"><i class="bx bx-user"></i></span>
                <span>Profile</span>
            </a> -->
        </aside>

        <!-- main content page -->
        <!-- <div class="w-full p-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita quam odit officiis
            magni doloribus ipsa dolore, dolores nihil accusantium labore, incidunt autem iure quae vitae voluptate,
            esse asperiores aliquam repellat. Harum aliquid non officiis porro at cumque eaque inventore iure. Modi sunt
            optio mollitia repellat sed ab quibusdam quos harum!
        </div> -->
    </div>
</main>


</template>



<script>


</script>

<style scoped>
</style>