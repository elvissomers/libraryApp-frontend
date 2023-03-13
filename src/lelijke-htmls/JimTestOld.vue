<template>  
    <h1>Title</h1>

    <h3>This is a test</h3>

    <!-- <p v-for="book in books" :key="book.id">
        {{ book.title }} -- {{ book.author }}
    </p> -->

    <div>
        <h1>Random API Example</h1>
        <p>{{ quote }}</p>
    </div>


</template>

<script>
import axios from 'axios'

export default {
  name: 'RandomApiExample',
  data() {
    return {
      quote: '',
    };
  },
  mounted() {
    this.getRandomQuote();
  },
  methods: {
    getRandomQuote() {
      axios.get('https://api.quotable.io/random')
        .then(response => {
          this.quote = response.data.content;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};


// export default {
//     name: 'BookList',
//     data() {
//         return {
//             books: [],
//         }
//     },
// // async mounted() {
// //     // let result = await axios.get("http://localhost:8080/book")
// //     let result = await axios.get("https://random-data-api.com/api/v2/cannabis")
// //     console.warn(result.data.data)
// //     this.books = result.data.data
// // }

//     // methods: {
//     //     getBooks() {
//     //         axios.get('http://localhost:8080/book')
//     //         .then((response) => {
//     //             console.log(response.data)
//     //         })
//     //         .catch((error) => {
//     //             console.log(error)
//     //         })
//     //     }
//     // }
// }

// // axios.get('http://localhost:8080/%27)
// //   .then(response => {
// //     const books = response.data;
// //     books.forEach(book => {
// //       console.log(book.title);
// //     });
// //   })
// //   .catch(error => {
// //     console.log(error);
// //   });
</script>