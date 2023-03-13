<template>
    <!-- component, removed: mx-auto-->
    <div class="max-w-lg p-2">
        <div class="bg-white shadow-md rounded-lg max-w-xs dark:bg-zinc-800 dark:border-gray-700">
            <!-- Image -->
            <a href="#">
                <img class="rounded-t-lg p-8" src="https://media.npr.org/assets/img/2022/09/29/hero_custom-e3bbfda6925dc773b27ec4026ad5e8cf93019072-s1100-c50.jpg" alt="product image">
            </a>
            
            <div class="px-5 pb-5">
                <!-- Title -->
                <a href="#">
                    <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">"{{ book.title }}</h3>
                </a>
                <!-- Author -->
                <h3 class="text-gray-900 font-normal text-xl tracking-tight dark:text-white">{{ book.author }}</h3>
                <h3 class="text-gray-900 font-normal text-xl tracking-tight dark:text-white">{{ book.isbn }}</h3>
                <!-- Start date -->
                <h3 class="text-gray-900 font-normal text-xl tracking-tight dark:text-white">Geleend sinds: 21-02-2021</h3>
                <!-- End date? -->
            </div>
        </div>
    </div>
    
    </template>
    


<script>
import axios from 'axios';

export default {
  name: 'MyBooksView',
  data() {
    return {
      book: [],
    };
  },
  mounted() {
    this.getBook()
  },
  methods: {
    getBook() {
      axios.get('http://localhost:8080/book/' + this.$route.params.id)
        .then(response => {
          this.book = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
}
</script>
    
    
    <style>
    </style>