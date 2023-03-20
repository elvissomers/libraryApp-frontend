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
    // Authenticate user on each page
    authenticate(router) {
        // Redirect to login when not authenticated
        if (localStorage.getItem('token') == null) {
            this.clearAuthentication()
            console.log('redirecting to login')
            router.push('/login');
        }

        this.setAuthentication()
    },
    authenticateAdmin(router) {
        if (localStorage.getItem('admin') != 'true') {
            alert("You need admin rights to view the Admin panel")
            router.push('/');
            console.log('redirecting to home')
        }
    }

})