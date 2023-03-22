<template>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form @submit.prevent="editUser">
                    <h2>Wijzig gebruiker</h2>
                    <div class="inputbox">
                        <input type="email" id="email" v-model="user.emailAddress" required>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <input type="text" id="firstname" v-model="user.firstName" required>
                        <label for="">Voornaam</label>
                    </div>
                    <div class="inputbox">
                        <input type="text" id="lastname" v-model="user.lastName" required>
                        <label for="">Achternaam</label>
                    </div>
                    <!-- <div class="inputbox">
                        <input type="text" id="password" v-model="user.password" required>
                        <label for="">Wachtwoord</label>
                    </div> -->
                    <div>
                        <label for="">Admin:</label>
                        <input type="checkbox" v-model="user.admin" :checked="user.admin">
                    </div>
                    <button type="submit">Sla wijzigingen op</button>
                </form>
            </div>
        </div>
    </section>

</template>

<script>
import axios from 'axios';

export default {
  name: 'EditUser',
  data() {
    return {
        user: {
            emailAddress: '',
            firstName: '',
            lastName: '',
            admin: false,
            archived: false
        },
    };
  },
  created() {
    axios.get('http://localhost:8080/user/get/' + this.$route.params.id)
      .then(response => {
        this.user.firstName = response.data.firstName;
        this.user.lastName = response.data.lastName;
        this.user.emailAddress = response.data.emailAddress;
        this.user.admin = response.data.admin;
        this.user.archived = response.data.archived;
        console.log("created() function was run with some success")
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
      
    editUser() {

        axios.put('http://localhost:8080/user/' + this.$route.params.id, this.user)
        .then(response => {
          console.log('User updated:', response.status, this.user);
          alert("Gebruiker is succesvol geupdate!")
          this.$router.push('/admin/edit-users')
        })
        .catch(error => {
          console.log("error error error")
          console.log(this.user)
          console.log(error);
          alert("Er is iets foutgegaan, controleer de gegevens goed")
        })
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
        border: 2px transparent rgba(255,255,255,0.5);
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
        background: #000000;;
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

