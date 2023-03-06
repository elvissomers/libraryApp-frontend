import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/admin-panel/AdminView.vue'
import EditBooksView from '../views/admin-panel/EditBooksView.vue'
import RequestsView from '../views/admin-panel/RequestsView.vue'
import EditUsersView from '../views/admin-panel/EditUsersView.vue'
import AddUserView from '../views/admin-panel/AddUserView.vue'
import LoginView from '../views/LoginView.vue'
import MyBooksView from '../views/MyBooksView.vue'
import ContactView from '../views/ContactView.vue'

// Endpoints
// “/” 
// “/login/”
// “/mybooks/
// “/book/$`id`”
// “/contact”
// “/admin/requests
// “/admin/edit-users” 
// “/admin/edit-books”
// “/admin/add-user”

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/admin/requests',
    name: 'requests',
    component: RequestsView
  },
  {
    path: '/admin/edit-users',
    name: 'edit-users',
    component: EditUsersView
  },
  {
    path: '/admin/edit-books',
    name: 'edit-books',
    component: EditBooksView
  },
  {
    path: '/admin/add-user',
    name: 'add-user',
    component: AddUserView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/mybooks',
    name: 'mybooks',
    component: MyBooksView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
