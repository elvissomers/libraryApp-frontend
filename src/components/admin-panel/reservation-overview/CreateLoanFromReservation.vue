<template>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form @submit.prevent="createLoan">
                    <div><h2>Creëer een lening</h2></div>
                    <div><h2>Verwijder een reservering</h2></div>
                    <div class="inputbox">
                        <label for="">Reservation</label>

                        <select v-model="reservation">

                            <option v-for="reservation in reservations" :value="reservation" :key="reservation">
                                (ids: {{reservation.id}} {{ reservation.userId }} {{ reservation.bookId }}) - {{ reservation.date }} - {{ reservation.userFirstName }} - {{ reservation.userLastName }} - {{ reservation.bookTitle }}
                            </option>

                        </select>
                    </div>
                    <button class="submit-btn">Keur reservering toe en verwijder reservering</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateLoan',
  data() {
    return {
      reservation: {
        id: '',
        date: '',
        userId: '',
        bookId: ''
      },
      reservations: [],
    };
  },
  mounted() {
    this.getReservation();
  },
  methods: {
    createLoan() {
        axios.post('http://localhost:8080/loan/create/fromreservation', this.reservation)
        .then(response => {
            console.log(response)
            console.log('Copy added:', response.data);
            alert("Exemplaar succesvol toegevoegd")
        })
        .catch(error => {
          console.log(error);
        })
        axios.delete(`http://localhost:8080/reservation/delete/${this.reservation.id}`)
        .then(response => {
            console.log(response)
            console.log('reservation deleted')
            alert('reservation deleted')
        })
    },
    getReservation() {
      axios.get('http://localhost:8080/reservation/get')
        .then(response => {
          this.reservations = response.data;
          console.log(response)
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
    .inputbox{
        position: relative;
        margin: 30px 0;
        width: 310px;
        border-bottom: 2px solid #000000;;
    }
    .inputbox label{
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        color: #000000;
        font-size: 1em;
        pointer-events: none;
        transition: .5s;
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
    .inputbox ion-icon{
        position: absolute;
        right: 8px;
        color: #000000;;
        font-size: 1.2em;
        top: 20px;
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

