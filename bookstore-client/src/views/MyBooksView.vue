<template>
    <div class="MyBooks">
        My books page
        <h1 id="test">total vue packages: {{totalVuePackages}}</h1>
        <MyBooksTest></MyBooksTest>

    </div>
</template>

<script>
// @ is an alias to /src
import MyBooksTest from '@/components/lelijke-htmls/MyBooksTest.vue'
import axios from 'axios'

export default {
  name: 'MyBooksView',
  components: {
    MyBooksTest,
    },

    data() {
        return {
            totalVuePackages: null,
            bookList: []
            };
    },

    created(){
        axios.get("http://localhost:8080/book")
      .then(response => {
        for(var title in response['data']){
            for (var book in title){
                console.log(book)
                this.bookList.push(book)
                this.totalVuePackages = book
            }
        }
      })
    }
}

</script>