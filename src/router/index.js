import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import EditBooksView from '../views/admin-panel/book/EditBooksView.vue'
import RequestsView from '../views/admin-panel/RequestsView.vue'
import EditUsersView from '../views/admin-panel/user/EditUsersView.vue'
import AddUserView from '../views/admin-panel/user/AddUserView.vue'
import AddBookView from '../views/admin-panel/book/AddBookView.vue'
import AddCopyView from '../views/admin-panel/AddCopyView.vue'
import LoanedBooksView from '../views/admin-panel/book/LoanedBooksView.vue'
import ReservationsView from '../views/admin-panel/ReservationsView.vue'
import LoginView from '../views/general-pages/LoginView.vue'
import MyBooksView from '../views/MyBooksView.vue'
import ContactView from '../views/general-pages/ContactView.vue'
import MyTestView from '../views/test/MyTestView.vue'
import MyAccountView from '../views/general-pages/MyAccountView.vue'
import CatalogueView from '../views/CatalogueView.vue'
import BookDetailView from '../views/detail-pages/BookDetailView.vue'
import BookDetailAdminView from '../views/detail-pages/BookDetailAdminView.vue'
import UpdateBookView from '../views/admin-panel/book/UpdateBookView.vue'
import CreateLoanFromReservation from '../components/admin-panel/reservation-overview/CreateLoanFromReservation.vue'
import PageNotFoundView from '../views/general-pages/PageNotFoundView.vue'
import UserDetailView from '../views/detail-pages/UserDetailView.vue'
import UpdateUserView from '../views/admin-panel/user/UpdateUserView.vue'
import CreateLoanForUser from '../components/admin-panel/reservation-overview/CreateLoanForUser.vue'

const routes = [
  {
    path: '/admin/requests',
    name: 'requests',
    component: RequestsView
  },
  {
    path: '/admin/edit-users',
    name: 'edit-users',
    component: EditUsersView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/edit-books',
    name: 'edit-books',
    component: EditBooksView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/add-user',
    name: 'add-user',
    component: AddUserView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/add-book',
    name: 'add-book',
    component: AddBookView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/add-copy',
    name: 'add-copy',
    component: AddCopyView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/createLoan',
    name: 'create-loan',
    component: CreateLoanFromReservation,
    meta: { requiresAdmin: true }
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
    path: '/myaccount',
    name: 'myaccount',
    component: MyAccountView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/admin/loans',
    name: 'loans',
    component: LoanedBooksView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/reservations',
    name: 'reservations',
    component: ReservationsView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/mytestpage',
    name: 'mytestpage',
    component: MyTestView
  },
  {
    path: '/',
    name: 'catalogue',
    component: CatalogueView
  },
  {
    path: '/book/:id',
    name: 'book-detail',
    component: BookDetailView,
  },
  {
    path: '/book/admin/:id',
    name: 'book-detail-admin',
    component: BookDetailAdminView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/book/:id/update',
    name: 'update-book',
    component: UpdateBookView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/user/:id',
    name: 'user-detail',
    component: UserDetailView,
  },
  {
    path: '/user/:id/update',
    name: 'update-user',
    component: UpdateUserView
  },
  {
    path: '/admin/loan/createForUser',
    name: 'create-loan-user',
    component: CreateLoanForUser,
    meta: { requiresAdmin: true }
  },
  {
    path: '/notfound',
    name: 'page-not-found',
    component: PageNotFoundView,
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const isAuthenticated = store.getters.isAuthenticated
  const isAdmin = store.getters.isAdmin

  console.log("admin: " + typeof isAdmin)

  if (to.name !== 'login' && !isAuthenticated) {
    console.log(1)
    next('/login')
  } else if (requiresAdmin && !isAdmin) {
    console.log(2)
    alert("admin rights required")
    next('/')
  } else {
    console.log(3)
    next()
  }
})
export default router
