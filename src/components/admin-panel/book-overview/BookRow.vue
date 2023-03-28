<template>
  <div class="flex flex-row justify-between hover:bg-blue-200"
    :class="[book.archived ? 'bg-slate-300 border-white' : '']">
    <div class="flex flex-row py-4">
      <div class="w-40 ml-8">{{ book.isbn }}</div>
      <div class="w-52">{{ book.author }}</div>
      <router-link :to="{ name: 'book-detail', params: { id: book.id } }" class="hover:text-lime-500">
        <div>{{ truncatedTitle }}</div>
      </router-link>
    </div>

    <div class="flex flex-row">
      <div class="float:right p-4" :class="[book.archived ? 'visible' : 'invisible']">Gearchiveerd</div>

      <!-- <router-link :to="{ name: 'update-book', params: { id: book.id } }" class="hover:text-gray-200">
        <button
          class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Wijzig
        </button>
      </router-link> -->

      <button v-on:click="this.$emit('openAssignUserPopup', book)"
        class="float-right text-white bg-blue-500 px-3 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 flex flex-nowrap">
        <span>
          +
        </span>
        <span class="material-symbols-outlined align-middle ">
          assignment_ind
          <!-- supervisor_account -->
        </span>
      </button>

      <!-- <router-link :to="{ name: 'book-detail', params: { id: book.id } }" class="hover:text-gray-200">
        <button
          class="float-right text-white bg-blue-500 px-4 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Bekijk
        </button>
      </router-link> -->

      <button v-if="!book.archived" v-on:click="archive()"
        class="float-right text-white bg-blue-500 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-24">Archiveer
      </button>
      <button v-else v-on:click="dearchive()"
        class="float-right text-white bg-slate-500 py-2 m-2 h-fit rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-24">Dearchiveer
      </button>

    </div>


  </div>
</template>
    
    
<script>
import axios from 'axios';

export default {
  name: "BookRow",
  props: ['book'],
  data() {
    return {
      showBooksPopup: false,
      showCopyPopup: false,
      // user: [],
      // book: null,
      // notifications: {loanCreated: false},
      // store
    };
  },
  computed: {
    truncatedTitle() {
      if (this.book.title.length > 50) {
        return this.book.title.substring(0, 50) + '...';
      } else {
        return this.book.title;
      }
    },
  },
  methods: {
    deleteBook(id) {
      if (window.confirm("Weet je zeker dat je dit boek wilt verwijderen?")) {
        axios.delete(`http://localhost:8080/book/delete/${id}`)
          .then(response => {
            console.log('Verwijderde boek:', response.data);
            alert('Het boek is verwijderd')
            window.location.reload()
          })
          .catch(error => {
            console.log(error);
          })
      }
      else {
        alert("Het proces is geannuleerd")
      }

    },
    archive() {
      if (confirm("Weet je zeker dat je dit boek wilt archiveren? Het boek kan dan niet meer uitgeleend worden.")) {
        axios.put("http://localhost:8080/book/archive/" + this.book.id)
          .then(response => {
            console.log(response.data)
            if (response.data == true) {
              alert("Boek " + this.book.title + " is gearchiveerd")
              window.location.reload();
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    },

    dearchive() {
      if (confirm("Weet je zeker dat je dit boek terug wilt halen? Het boek kan dan weer uitgeleend worden.")) {
        axios.put("http://localhost:8080/book/archive/" + this.book.id)
          .then(response => {
            console.log(response.data)
            if (response.data == true) {
              alert("Boek " + this.book.title + " is terug gehaald")
              window.location.reload();
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  },
}
</script>