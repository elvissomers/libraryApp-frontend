<template>
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <!-- IMAGE -->
          <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg">
          <!-- <img class="rounded-t-lg p-8 w-full h-96" :src="require(`@/assets/bookCovers/` + book.isbn + `.jpg`)"
            alt="product image"> -->
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">{{ book.author }}</h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ book.title }}</h1>
            <div class="flex mb-4">
            </div>
            <!-- Description -->
            <p class="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia
              microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan
              poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed
              umami cardigan.</p>
            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div class="flex">
                <span class="mr-3">ISBN: {{ book.isbn }}</span>
              </div>
            </div>
            <div class="flex">
              <!-- removed: ml-auto -->
              <button @click="createReservation()"
                class="flex text-white bg-lime-500 border-0 py-2 px-6 focus:outline-none hover:bg-lime-600 rounded">Reserveer</button>
              <button @click='createCopy()'
                class="flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Maak nieuwe kopie aan</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
      
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MyBooksView',
    data() {
      return {
        book: [],
        reservation: {
          date: '',
          userId: '',
          bookId: '',
        },
        copy: {
            // TODO: this needs to be the actual ID of the book
            bookId: 3
            // ?
            // bookId: this.book.id
        }
      };
    },
    mounted() {
      this.getBook()
    },
    methods: {
    // unused function
    createCopy() {
      axios.post('http://localhost:8080/copy/create', this.copy)
        .then(response => {
          console.log('Copy added:', response.data);
        })
        .catch(error => {
          console.log(error);
        })
        // alleen als successvol nog niet werkend
        .then(() => this.$router.push('edit-books'));
    },


    createCopies(){
        for(let i = 0; i < this.amount_copies; i++){
            axios.post('http://localhost:8080/copy/create', this.copy)
        }
        alert(this.amount_copies+ ' copies have been added for this book')
        this.$router.push('edit-books')
    },
        
    getBook() {
        axios.get('http://localhost:8080/book/' + this.$route.params.id)
          .then(response => {
            this.book = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
    createReservation() {
        this.reservation.date = this.getCurrentDate()
        // TODO: this has to be the ID of the current user (retrieved by token!)
        this.reservation.userId = 3
        this.reservation.bookId = this.book.id
        console.log(this.reservation)
  
        axios.post('http://localhost:8080/reservation/create', this.reservation)
          .then(response => {
            console.log('Reservation created:', response.data);
          })
          .catch(error => {
            console.log(error);
          })
          .then(() => this.$router.push('mybooks'));
      },
    getCurrentDate() {
        let currentDate = new Date().toJSON().slice(0, 10);
        // console.log(currentDate); // "2023-03-13"
        return currentDate
      }
    },
  }
  </script>
      
      
  <style></style>