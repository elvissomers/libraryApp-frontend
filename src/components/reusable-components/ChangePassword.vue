<template>
    <main id="content" role="main" class="w-full max-w-md mx-auto p-6">
        <!-- removed: dark:bg-gray-800 dark:border-gray-700-->
        <div class=" bg-neutral-50  rounded-xl shadow-lg ">
            <div class="p-4 sm:p-7">
                <div class="text-center">
                    <!-- removed: dark:text-white-->
                    <h1 class="block text-2xl font-bold text-gray-800 ">Stel je wachtwoord in</h1>
                    <!-- removed: dark:text-gray-400 -->
                    <!-- <p class="mt-2 text-sm text-gray-600 ">
                        Remember your password?
                        <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">
                            Login here
                        </a>
                    </p> -->
                </div>

                <div class="mt-5">
                    <form @submit.prevent="changePassword">
                        <div class="grid gap-y-4">
                            <div>
                                <label for="email" class="block text-sm font-bold ml-1 my-2 ">
                                    Email adres
                                </label>
                                <div class="relative">
                                    <input type="email" id="email" name="email" v-model="user.email"
                                        class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        required aria-describedby="email-error">
                                </div>

                                <label for="password" class="block text-sm font-bold ml-1 my-2 ">
                                    Oude wachtwoord
                                </label>
                                <div class="relative">
                                    <input type="password" id="password" name="password" v-model="user.oldPassword"
                                        class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        required aria-describedby="password-error">
                                </div>
                                <label for="password" class="block text-sm font-bold ml-1 my-2 ">
                                    Nieuwe wachtwoord
                                </label>
                                <div class="relative">
                                    <input type="password" id="password" name="password" v-model="user.newPassword"
                                        class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        required aria-describedby="password-error">
                                </div>
                                <label for="password" class="block text-sm font-bold ml-1 my-2 ">
                                    Herhaal nieuwe wachtwoord
                                </label>
                                <div class="relative">
                                    <input type="password" id="password" name="password" v-model="newPasswordCheck"
                                        class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        required aria-describedby="password-error">
                                </div>
                            </div>
                            <!-- removed: dark:focus:ring-offset-gray-800 -->
                            <button type="submit"
                                class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ">
                                Verander wachtwoord
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ChangePassword',
    data() {
        return {
            user: {
                email: '',
                oldPassword: '',
                newPassword: '',
            },
            newPasswordCheck: ''
        };
    },
    methods: {
        changePassword() {            
            if (this.user.newPassword == this.newPasswordCheck) {
                axios.put('http://localhost:8080/user/change-password', this.user)
                    .then(response => {
                        if (response.data) {
                            console.log('User updated:', response.status, this.user);
                            alert("Wachtwoord is succesvol geüpdatet!")
                            this.$router.push('/login')
                        } else {
                            alert("Wachtwoord wijzigen is niet gelukt")
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert("Er is iets foutgegaan, controleer de gegevens goed")
                    })
            } else {
                alert("Wachtwoord komt niet overeen, controleer je wachtwoord goed!")
            }
        },
    }
};
</script>