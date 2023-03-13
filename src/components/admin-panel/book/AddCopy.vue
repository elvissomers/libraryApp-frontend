<template>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form @submit.prevent="createCopies">
                    <h2>Voeg een examplaar toe</h2>
                    <div class="inputbox">
                        <label for="" class="inline-label">Boek</label>

                        <select v-model="copy.bookId">

                            <option class="inline-input" v-for="book in books" :value="book.id" :key="book.id">
                                {{ book.title }} - {{ book.author }}
                            </option>

                        </select>
                        <label for="" class="inline-label">Aantal Kopieën</label>
                        <input id='amount_copies' type="number" v-model="amount_copies" min="0" class="inline-input" required>
                    </div>
                    <button class="submit-btn">Voeg toe</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddCopy',
  data() {
    return {
      copy: {
        bookId: '',
      },
      amount_copies: 0,
      books: [],
    };
  },
  mounted() {
    this.getBooks();
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

    getBooks() {
      axios.get('http://localhost:8080/book')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>


<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
    *{
        margin: 0;
        padding: 0;
        /* font-family: 'poppins',sans-serif; */
    }
    .inline-label {
        display: inline-block;
        width: 500px; /* set a width to make the labels align properly */
        vertical-align: middle; /* align the label and input elements vertically */
    }

    .inline-input {
        display: inline-block;
        width: calc(100% - 100px); /* subtract the label width from the input width */
        margin-left: 10px; /* add some margin between the label and input elements */
        vertical-align: middle; /* align the label and input elements vertically */
        border: 1px solid #ccc !important;
        padding: 5px !important;
        height: 30px !important;
        
    }
    section{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;
        
        /* background: url('background6.jpg')no-repeat; */
        background-position: center;
        background-size: cover;
    }
    .form-box{
        position: relative;
        width: 400px;
        height: 450px;
        background: transparent;
        border: 2px solid rgba(255,255,255,0.5);
        border-radius: 20px;
        backdrop-filter: blur(15px);
        display: flex;
        justify-content: center;
        align-items: center;

    }
    h2{
        font-size: 2em;
        color: #000000;
        text-align: center;
    }
    input:focus ~ label,
    input:valid ~ label{
    top: -5px;
    }
    .inputbox input {
        width: 100%;
        height: 50px;
        background: transparent;
        border: none;
        outline: none;
        font-size: 1em;
        padding:0 35px 0 5px;
        color: #000000;;
    }
    button{
        width: 100%;
        height: 40px;
        border-radius: 40px;
        background: #000000;
        color: rgb(255, 255, 255);
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1em;
        font-weight: 600;
    }
    button:hover{
        background: #757575;
    }
</style>

