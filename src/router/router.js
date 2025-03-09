import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Error404 from '../pages/Error404.vue'

// Lazy load para las páginas que no son críticas en la carga inicial
const Portfolio = () => import('../pages/Portfolio.vue')
const Profile = () => import('../pages/Profile.vue')
const PortfolioDesign = () => import('../pages/Portfolio-design.vue')
const Contact = () => import('../pages/Contact.vue')
const Characteristics = () => import('../pages/Characteristics.vue')

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
    component: Profile,
    children: [
      {
        path: 'portfolio-design',
        name: 'PortfolioDesign',
        component: PortfolioDesign
      }
    ]
  },
  {
    path: '/portfolio/:id',
    name: 'Portfolio',
    component: Portfolio
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

export default router