import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import AdminView from '../views/admin-panel/AdminView.vue'
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
import UpdateBookView from '../views/admin-panel/book/UpdateBookView.vue'
import CreateLoanFromReservation from '../components/admin-panel/reservation-overview/CreateLoanFromReservation.vue'
import PageNotFoundView from '../views/general-pages/PageNotFoundView.vue'
import UserDetailView from '../views/detail-pages/UserDetailView.vue'
import UpdateUserView from '../components/admin-panel/user/EditUser.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: AdminView
  // },
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
    path: '/admin/add-book',
    name: 'add-book',
    component: AddBookView
  },
  {
    path: '/admin/add-copy',
    name: 'add-copy',
    component: AddCopyView
  },
  {
    path: '/admin/createLoan',
    name: 'create-loan',
    component: CreateLoanFromReservation
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
    component: LoanedBooksView
  },
  {
    path: '/admin/reservations',
    name: 'reservations',
    component: ReservationsView
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
    path: '/book/:id/update',
    name: 'update-book',
    component: UpdateBookView,
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
    path: '/notfound',
    name: 'page-not-found',
    component: PageNotFoundView,
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
