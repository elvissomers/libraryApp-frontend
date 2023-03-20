<template>
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <!-- IMAGE -->
          <!--<img v-if="!bookFetching" alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            v-bind:src="require(`@/assets/bookCovers/` + book.isbn + `.jpg`)"> -->
          <img v-if="!bookFetching" alt="ecommerce" class="h-96 rounded border border-gray-200"
            v-bind:src="require(`@/assets/bookCovers/` + book.isbn + `.jpg`)">
          <!-- <img class="rounded-t-lg p-8 w-full h-96" :src="require(`@/assets/bookCovers/` + book.isbn + `.jpg`)"
            alt="product image"> -->
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <span v-if="!bookFetching" class="text-sm title-font text-gray-500 mr-2 tracking-widest">{{ book.author }}</span>
            <button @click="changeAuthor()"
            class="text-white bg-grey-500 border-0 py-1 px-1 focus:outline-none hover:bg-grey-600 rounded">
            <img alt="ecommerce" class="lg:w-1/1 w-4 object-cover object-center rounded"
            src="https://cdn-icons-png.flaticon.com/512/61/61456.png?w=740&t=st=1678887410~exp=1678888010~hmac=91d3144990e622b8cafc0f2e8f4123973c3327bf4b075f343aaec0581930ca12">
            </button>
            
            <h1></h1>
            <span v-if="!bookFetching" class="text-gray-900 text-3xl mr-2 title-font font-medium mb-1">{{ book.title }}</span>
            <button @click="changeTitle()"
            class="text-white bg-grey-500 border-0 py-1 px-1 focus:outline-none hover:bg-grey-600 rounded">
            <img alt="ecommerce" class="lg:w-1/1 w-4 object-cover object-center rounded"
            src="https://cdn-icons-png.flaticon.com/512/61/61456.png?w=740&t=st=1678887410~exp=1678888010~hmac=91d3144990e622b8cafc0f2e8f4123973c3327bf4b075f343aaec0581930ca12">
            </button>
            <div class="flex mb-4">
            </div>
            <!-- Description -->
            <p class="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia
              microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan
              poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed
              umami cardigan.</p>
              <button>Edit</button>
            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div class="flex">
                <span v-if="!bookFetching" class="mr-3">ISBN: {{ book.isbn }}</span>
                <button @click="changeIsbn()"
            class="text-white bg-grey-500 border-0 py-1 px-1 focus:outline-none hover:bg-grey-600 rounded">
            <img alt="ecommerce" class="lg:w-1/1 w-4 object-cover object-center rounded"
            src="https://cdn-icons-png.flaticon.com/512/61/61456.png?w=740&t=st=1678887410~exp=1678888010~hmac=91d3144990e622b8cafc0f2e8f4123973c3327bf4b075f343aaec0581930ca12">
            </button>
              </div>
            </div>
            <div class="flex">
              <!-- removed: ml-auto -->
              <button @click="createReservation()"
                class="flex text-white bg-lime-500 border-0 py-2 px-6 mr-2 focus:outline-none hover:bg-lime-600 rounded">Reserveer</button>
              
              <button @click='createCopies()'
                class="flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Maak nieuwe kopie aan</button>
            </div>
            
            
            <UsersPopup class="fixed top-32 z-10" :class="[userPopupVisible ? 'visible' : 'invisible']"></UsersPopup>

          </div>
        </div>
      </div>
    </section>
  </template>
      
  
  
  <script>
  import axios from 'axios';
  import UsersPopup from '@/components/details/book-detail-page/UsersPopup.vue'
  
  export default {
    name: 'MyBooksView',

    components: {
      UsersPopup
    },

    data() {
      return {
        book: null,
        bookFetching: true,
        reservation: {
          date: '',
          userId: '',
          bookId: '',
        },
        userPopupVisible: true,
        copy: {
            // TODO: this needs to be the actual ID of the book
            bookId: 0,
            amount: 1
            // ?
            // bookId: this.book.id
        }
      };
    },
    mounted() {
      this.getBook()
    },
    methods: {
    // Get methods from here
    getCurrentDate() {
        let currentDate = new Date().toJSON().slice(0, 10);
        // console.log(currentDate); // "2023-03-13"
        return currentDate
    },

    getBook() {
        axios.get('http://localhost:8080/book/get/' + this.$route.params.id)
          .then(response => {
            this.book = response.data;
            this.copy.bookId = this.book.id;
            this.bookFetching = false
          })
          .catch(error => {
            console.log(error);
          });
      },

      createReservation() {
      this.reservation.date = this.getCurrentDatey()
      // TODO: this has to be the ID of the current user (retrieved by token!)
      this.reservation.userId = 3
      this.reservation.bookId = this.book.id
      console.log(this.reservation)

      let headers = {
        'Authentication': localStorage.getItem('token')
      }

      axios.post('http://localhost:8080/reservation/create', this.reservation, {
        headers: headers
      })
        .then(response => {
          console.log(100)
          console.log('Reservation created:', response.data);
          alert('Reservation created.');
        })
        .catch(error => {
          console.log(200)
          console.log(error);
        })
        .then(() => this.$router.push('mybooks'));
    },
    getCurrentDatey() {
      let currentDate = new Date().toJSON().slice(0, 10);
      // console.log(currentDate); // "2023-03-13"
      return currentDate
    },

    // Create methods from here
    createCopy() {
      this.copy.amount = 1
      axios.post('http://localhost:8080/copy/create', this.copy)
        .then(response => {
          console.log('Copy added:', response.data);
          alert("Copy was added")
        })
        .catch(error => {
          console.log(error);
        })
    },


    createCopies(){
        this.copy.amount = prompt("Hoeveel ?")
        axios.post('http://localhost:8080/copy/create', this.copy)
        .then(response => {
          console.log('Copy added:', response.data);
        })
        .catch(error => {
          console.log(error);
        })
        alert(this.copy.amount + ' copies have been added for this book')
    },
        
    

    // Change methods from here
    changeAuthor() {
        let newAuthor = prompt("Voer nieuwe auteur in:")

        let changeBook = this.book
        changeBook.author = newAuthor

        axios.put('http://localhost:8080/book/update/' + this.$route.params.id, changeBook)
        console.log('Changed author name into ', newAuthor)
         
      },
    
    changeTitle() {
        let newTitle = prompt("Voer nieuwe titel in:")
        let changeBook = this.book
        changeBook.title = newTitle

        axios.put('http://localhost:8080/book/update/' + this.$route.params.id, changeBook)
        console.log('Changed title into ', newTitle)
    },

    changeIsbn() {
        let newIsbn = prompt("Voer nieuw ISBN in:")
        let changeBook = this.book
        changeBook.isbn = newIsbn

        alert("ISBN veranderen niet toegestaan!")
        // axios.put('http://localhost:8080/book/' + this.$route.params.id, changeBook)
        // console.log('Changed isbn into ', newIsbn)
    }

    
    },
  }
  </script>
      
      
  <style></style>