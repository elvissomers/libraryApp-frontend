<template>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form @submit.prevent="editForm">
                    <h2>Wijzig gebruiker</h2>
                    <div class="inputbox">
                        <input type="email" id="email" v-model="user.emailAddress" required>
                        <label class="font-extrabold" for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <input type="text" id="firstname" v-model="user.firstName" required>
                        <label class="font-extrabold" for="">Voornaam</label>
                    </div>
                    <div class="inputbox">
                        <input type="text" id="lastname" v-model="user.lastName" required>
                        <label class="font-extrabold" for="">Achternaam</label>
                    </div>
                    <!--Only shows when the page was called from the UserDetail page-->
                    <div class="inputbox" v-if="$route.query.parent == 'UserDetail'">
                        <input type="text" id="password" v-model="user.password">
                        <label class="font-extrabold" for="">Nieuw wachtwoord (indien gewenst)</label>
                    </div>
                    <div class="pb-2 flex align-middle">
                        <label for="" class="p-1">Admin:</label>
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
import store from '@/store';

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
        store
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
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
      
    // handles the form once the user submits by clicking on the button
    editForm() {
        // control whether the admin is themselves, to prevent themselves from removing their own admin status
        axios.get(`http://localhost:8080/user/getbytoken/${localStorage.getItem("token")}`)
        .then(response => {
            if(localStorage.getItem("userId") == response.data.id.toString() && localStorage.getItem("admin") == true.toString()){
                console.log("localstorage Id is the same as token iser id")
                console.log("localstorage admin is true")
                console.log(this.user.admin)
                if(this.user.admin == false){
                    alert("Je kunt jezelf niet onadminnen")
                    return
                }
            }
            if(this.user.password != ""){
            this.saveUserChanges()
            }
            else{
            this.updateAnUser()
            }
        })
    },

    // calls when an user wants to edit their own info
    saveUserChanges() {
    let userPassword = prompt("Bevestig uw huidige wachtwoord om de wijzigingen op te slaan", { type: 'password'})
    axios.get(`http://localhost:8080/user/self/${this.$route.params.id}/${userPassword}`)
        .then(response => {
            if (response.data) {
                if(typeof this.user.password === 'undefined'){
                    this.user.password = userPassword
                }
                axios.put(`http://localhost:8080/user/self/${this.$route.params.id}`, this.user)
                    .then(response => {
                        console.log('User created:', response.data);
                        alert("Gebruiker succesvol gewijzigd!");
                    })
                    .catch(error => {
                        alert('Er is iets fout gegaan bij het wijzigen van de gegevens')
                        console.log(error);
                    })
            } else {
                alert("Wachtwoord is niet correct");
            }
        })
        .catch(error => {
            alert('Er is iets fout gegaan bij het ophalen van de gegevens')
            console.log(error);
        })
    },

    // Calls when an admin wants to edit an user in the admin panel
    updateAnUser(){
        axios.put('http://localhost:8080/user/' + this.$route.params.id, this.user)
        .then(response => {
          console.log('User updated:', response.status, this.user);
          alert("Je hebt de gebruiker succesvol geüpdatet!")
          this.$router.push('/admin/edit-users')
            })
        .catch(error => {
          console.log("error error error")
          console.log(this.user)
          console.log(error);
          alert("Er is iets foutgegaan, controleer de gegevens goed")
            })
        }
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

