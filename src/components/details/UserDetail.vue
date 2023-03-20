<template>

    <!-- <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"></script> -->

    <!-- removed:  w-4/6 mx-auto -->
    <div class="h-full bg-gray-100 p-8">
        <div class="bg-white rounded-lg shadow-xl pb-8">
            <div class="absolute right-12 mt-4 flex flex-nowrap">
                <div class="rounded mr-4">
                    <!-- removed: @click="openSettings = !openSettings" -->
                    <button class="flex text-white bg-teal-500 border-0 py-2 px-3 focus:outline-none hover:bg-teal-600 rounded">+ <span class="material-symbols-outlined"> menu_book</span></button>
                </div>

                <div class="rounded">
                <!-- removed: @click="openSettings = !openSettings" class="hover:text-gray-200"-->
                    <router-link :to="{ name: 'update-user' }">
                        <button class="flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded">Wijzig profiel</button>
                    </router-link>
                </div>

                

            </div>
            
            
            
            <div class="w-full h-[250px]">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg">
            </div>
            <div class="flex flex-col items-center -mt-20">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg" class="w-40 border-4 border-white rounded-full">
                <div class="flex items-center space-x-2 mt-2">
                    <!-- name -->
                    <p class="text-2xl">{{ user.firstName }} {{ user.lastName }}</p>
                    
                </div>
                <!-- <p class="text-gray-700">Senior Software Engineer at Tailwind CSS</p>
                <p class="text-sm text-gray-500">New York, USA</p> -->
            </div>
            <!-- <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                <div class="flex items-center space-x-4 mt-2">
                    <button class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                        </svg>
                        <span>Connect</span>
                    </button>
                    <button class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                        </svg>
                        <span>Message</span>
                    </button>
                </div>
            </div> -->
        </div>

        <!-- removed: 2xl:flex-row 2xl:space-y-0 2xl:space-x-4-->
        <div class="my-4 flex flex-col space-y-4">
            <!-- removed: 2xl:w-1/3 -->
            <div class="w-full flex flex-col ">
                <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 class="text-xl text-gray-900 font-bold">Persoonlijke gegevens</h4>
                    <ul class="mt-2 text-gray-700">
                        <li class="flex border-y py-2">
                            <span class="font-bold w-24">Naam:</span>
                            <span class="text-gray-700">{{ user.firstName }} {{ user.lastName }}</span>
                        </li>
                        <!-- <li class="flex border-b py-2">
                            <span class="font-bold w-24">Joined:</span>
                            <span class="text-gray-700">10 Jan 2022 (25 days ago)</span>
                        </li> -->
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Email:</span>
                            <span class="text-gray-700">{{ user.emailAddress }}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Beheerder:</span>
                            <span class="text-gray-700">{{ user.Admin }}</span>
                        </li>
                        
                    </ul>
                </div>
                
            </div>
        
        </div>

    </div>

</template>

<script>
    import axios from 'axios';

    export default {
    name: 'UserDetail',
    data() {
        return {
        user: [],
        };
    },
    mounted() {
        console.log('id: ' + this.$route.params.id)
        this.getUser()
        console.log(this.user)
    },
    methods: {
        getUser() {
        axios.get('http://localhost:8080/user/get/' + this.$route.params.id)
            .then(response => {
            this.user = response.data;
            })
            .catch(error => {
            console.log(error);
            });
        },
    },
    }


    // const DATA_SET_VERTICAL_BAR_CHART_1 = [68.106, 26.762, 94.255, 72.021, 74.082, 64.923, 85.565, 32.432, 54.664, 87.654, 43.013, 91.443];

    // const labels_vertical_bar_chart = ['January', 'February', 'Mart', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];

    // const dataVerticalBarChart= {
    //     labels: labels_vertical_bar_chart,
    //     datasets: [
    //         {
    //             label: 'Revenue',
    //             data: DATA_SET_VERTICAL_BAR_CHART_1,
    //             borderColor: 'rgb(54, 162, 235)',
    //             backgroundColor: 'rgba(54, 162, 235, 0.5)',
    //         }
    //     ]
    // };
    // const configVerticalBarChart = {
    //     type: 'bar',
    //     data: dataVerticalBarChart,
    //     options: {
    //         responsive: true,
    //         plugins: {
    //             legend: {
    //                 position: 'top',
    //             },
    //             title: {
    //                 display: true,
    //                 text: 'Last 12 Months'
    //             }
    //         }
    //     },
    // };

    // var verticalBarChart = new Chart(
    //     document.getElementById('verticalBarChart'),
    //     configVerticalBarChart
    // );
</script>