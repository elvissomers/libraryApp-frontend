<template>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form @submit.prevent="loginUser">
                    <h2>Login</h2>
                    <div class="inputbox">
                        <!-- <span class="material-symbols-outlined">alternate_email</span> -->
                        <input type="email" id="username" v-model="user.username" required>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <!-- <span class="material-symbols-outlined">lock</span> -->
                        <input type="password" id="password" v-model="user.password" required>
                        <label for="">Wachtwoord</label>
                    </div>
                    <!-- <div >
                        <label for="" class="forgot">
                            <div class="remember">
                                <input type="checkbox" class="checkbox">Remember Me
                            </div>
                            <a class="forgot-pass" href="#">Forgot Password</a>
                        </label>
                    </div> -->
                    <button>Log in</button>
                    <!-- <div class="register">
                        <p>Don't have a account <a href="#">Register</a></p>
                    </div> -->
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
  
  export default {
    name: 'LoginCard',
    data() {
      return {
        user: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
        loginUser() {
        axios.post('http://localhost:8080/api/user/login', this.user)
          .then(response => {
            console.log('User logged in:', response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('admin', response.data.admin);
          })
          .catch(error => {
            console.log(error);
          })
          .then(() => this.$router.push('home'));
      }
    }
}
    
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

    /* .forgot-pass {
        display: flex;

    } */

    .remember {
        display: flex;
        
    }

    .checkbox {
        margin-right: 6px;
        margin-left: 1px;
    }

    .forgot{
        margin: -15px 0 15px ;
        font-size: .9em;
        color: #000000;;
        display: flex;
        justify-content: space-between;  
        /* gap: 100px; */
    }

    .forgot label input{
        margin-right: 3px;
        
    }
    .forgot label a{
        color: #000000;;
        text-decoration: none;
    }
    .forgot label a:hover{
        text-decoration: underline;
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
    .register{
        font-size: .9em;
        color: #000000;;
        text-align: center;
        margin: 25px 0 10px;
    }
    .register p a{
        text-decoration: none;
        color: #000000;;
        font-weight: 600;
    }
    .register p a:hover{
        text-decoration: underline;
    }
</style>

