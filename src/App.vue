<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <NavBar></NavBar>

  <!-- removed: class="my-20" -->
  <router-view  />

  <FooterComponent></FooterComponent>
</template>

<style>
#app {
  background: #f4f4f4;
}


/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 20
}
</style>

<script>
// @ is an alias to /src
import NavBar from '@/components/reusable-components/NavBar.vue'
import FooterComponent from './components/reusable-components/FooterComponent.vue';
import { store } from '@/store/store'

export default {
  name: 'TemplateView',
  components: {
    NavBar,
    FooterComponent,
  },
  data() {
    return {
      store
    };
  },
  mounted() {
    this.store.authenticate(this.$router)
  },
}
</script>