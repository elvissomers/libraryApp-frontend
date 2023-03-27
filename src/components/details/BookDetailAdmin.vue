<template>
  <section class="text-gray-700 body-font overflow-hidden">
    <div class="container px-5 pt-16 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap justify-center">
        <img v-if="!bookFetching" alt="ecommerce" class="h-96 rounded border border-gray-200"
          v-bind:src="require(`@/assets/bookCovers/` + book.isbn + `.jpg`)">
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <span v-if="!bookFetching" class="text-sm title-font text-gray-500 mr-2 tracking-widest">{{ book.author
          }}</span>

          <button @click="changeAuthor()"
            class="text-white bg-grey-500 border-0 py-1 px-1 focus:outline-none hover:bg-grey-600 rounded">
            <img alt="ecommerce" class="lg:w-1/1 w-4 object-cover object-center rounded"
              src="https://cdn-icons-png.flaticon.com/512/61/61456.png?w=740&t=st=1678887410~exp=1678888010~hmac=91d3144990e622b8cafc0f2e8f4123973c3327bf4b075f343aaec0581930ca12">
          </button>

          <h1></h1>
          <span v-if="!bookFetching" class="text-gray-900 text-3xl mr-2 title-font font-medium mb-1">{{ book.title
          }}</span>

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
              class="flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Maak
              nieuwe kopie aan</button>
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

  components: {

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
      user: {
        id: '',
        emailAddress: '',
        firstName: '',
        lastName: '',
        password: '',
      },
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
    this.getUser()
  },
  methods: {
    // Get methods from here
    getCurrentDate() {
      let currentDate = new Date().toJSON().slice(0, 10);
      // console.log(currentDate); // "2023-03-13"
      return currentDate
    },

    getUser() {
      axios.get('http://localhost:8080/user/getbytoken/' + localStorage.getItem("token"))
        .then(response => {
          this.user = response.data
          console.log("found user" + this.user.id)
        })
        .catch(error => {
          console.log(error)
        })
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
      this.reservation.userId = this.user.id
      this.reservation.bookId = this.book.id
      console.log(this.reservation)

      let headers = {
        'Authentication': localStorage.getItem('token')
      }

      axios.post('http://localhost:8080/reservation/create', this.reservation, {
        headers: headers
      })
        .then(response => {
          console.log('Reservation created:', response.data);
          if (response.data){
            alert('Reservering aangemaakt');
          } else {
            alert('Reservering kan niet aangemaakt worden')
          }
          window.location.reload()
        })
        .catch(error => {
          console.log(error);
        })
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
          alert("Kopie is aangemaakt")
          window.location.reload()
        })
        .catch(error => {
          console.log(error);
        })
    },


    createCopies() {
      this.copy.amount = prompt("Hoeveel kopieën wil je toevoegen?")
      if (this.copy.amount > 0) {
        axios.post('http://localhost:8080/copy/create', this.copy)
          .then(response => {
            console.log('Copy added:', response.data);
            alert("Er zijn " + this.copy.amount + ' kopieën aangemaakt voor dit boek')
          })
          .catch(error => {
            console.log(error);
          })
      }
    },



    // Change methods from here
    changeAuthor() {
      let headers = {
        'Authentication': localStorage.getItem('token')
      }

      let newAuthor = prompt("Voer nieuwe auteur in:")

      let changeBook = this.book
      changeBook.author = newAuthor


      axios.put('http://localhost:8080/book/update/' + this.$route.params.id, changeBook, {
        headers: headers
      })
      console.log('Changed author name into ', newAuthor)

    },

    changeTitle() {
      let headers = {
        'Authentication': localStorage.getItem('token')
      }
      let newTitle = prompt("Voer nieuwe titel in:")
      let changeBook = this.book
      changeBook.title = newTitle
      axios.put('http://localhost:8080/book/update/' + this.$route.params.id, changeBook, {
        headers: headers
      })
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