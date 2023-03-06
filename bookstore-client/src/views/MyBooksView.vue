<template>
    <div class="MyBooks">
        My books page
        <h1 id="test">Books: {{bookList}}</h1>
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
        var data = response['data']
        for(var i = 0; i in data; i++){
            var title = data[i].title
            this.bookList.push(title)
        }
      })
    }
}

</script>