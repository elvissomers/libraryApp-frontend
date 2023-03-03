import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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
