import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import { useAuthStore } from '../stores/authStore'
import { useLoadingStore } from '../stores/loadingStore';

// Lazy load para las páginas que no son críticas en la carga inicial
const Login = () => import('../pages/Login.vue')
const Register = () => import('../pages/Register.vue')
const Error404 = () => import('../pages/Error404.vue')
const Profile = () => import('../pages/Profile.vue')
const Contact = () => import('../pages/Contact.vue')
const Characteristics = () => import('../pages/Characteristics.vue')
const EditProfile = () => import('../pages/EditProfile.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/profile/:id/edit',
    name: 'EditProfile',
    component: EditProfile
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/characteristics',
    name: 'Characteristics',
    component: Characteristics
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Error404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación para verificar autenticación en cada página
router.beforeEach(async (to, from, next) => {
  const loadingStore = useLoadingStore()
  loadingStore.show()
  const authStore = useAuthStore()
  await authStore.checkAuth()
  next()
})
router.afterEach(() => {
  const loadingStore = useLoadingStore()
  loadingStore.hide()
})

export default router