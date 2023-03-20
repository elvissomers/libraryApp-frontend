import { reactive } from 'vue'

export const store = reactive({
  authenticated: false,
  admin: false,

  setAuthentication() {
    this.authenticated = true;
    console.log("Authenticated: " + this.authenticated)
  },
  setAdmin() {
    this.admin = true;
    console.log("Admin: " + this.admin)
  },
  clearAuthentication() {
    this.authenticated = false;
    console.log("Authenticated: " + this.authenticated)
  },
  clearAdmin() {
    this.admin = false;
    console.log("Admin: " + this.admin)
  },
  authenticate(router) {
    // if (this.authenticated == false) {
    if (localStorage.getItem('token') == null ) {
        console.log('redirecting to login')
        router.push('/login');
    }
  }

})