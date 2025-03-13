// Importamos los módulos necesarios para configurar el router de Vue
import { createRouter, createWebHistory } from 'vue-router'
// Importamos los componentes críticos que no usaremos lazy loading
import Home from '../pages/Home.vue'
// Importamos los stores necesarios para gestionar autenticación y carga
import { useAuthStore } from '../stores/authStore'
import { useLoadingStore } from '../stores/loadingStore';

// Definimos las rutas de la aplicación con lazy loading para componentes no críticos
// Lazy loading reduce el tamaño inicial de la aplicación cargando componentes solo cuando son necesarios
const Login = () => import('../pages/Login.vue')
const Register = () => import('../pages/Register.vue')
const Error404 = () => import('../pages/Error404.vue')
const Profile = () => import('../pages/Profile.vue')
const Contact = () => import('../pages/Contact.vue')
const Characteristics = () => import('../pages/Characteristics.vue')
const EditProfile = () => import('../pages/EditProfile.vue')

// Configuración de las rutas de la aplicación
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home // Página de inicio cargada de forma sincrona
  },
  {
    path: '/login',
    name: 'Login',
    component: Login // Página de login cargada de forma lazy
  },
  {
    path: '/register',
    name: 'Register',
    component: Register // Página de registro cargada de forma lazy
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile // Página de perfil cargada de forma lazy
  },
  {
    path: '/profile/:id/edit',
    name: 'EditProfile',
    component: EditProfile // Página de edición de perfil cargada de forma lazy
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact // Página de contacto cargada de forma lazy
  },
  {
    path: '/characteristics',
    name: 'Characteristics',
    component: Characteristics // Página de características cargada de forma lazy
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Error404 // Página de error 404 para rutas no encontradas
  }
]

// Creamos el router con historial web y las rutas definidas
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación beforeEach: Se ejecuta antes de cada cambio de ruta
router.beforeEach(async (to, from, next) => {
  // Mostramos el indicador de carga
  const loadingStore = useLoadingStore()
  loadingStore.show()

  // Verificamos la autenticación del usuario
  const authStore = useAuthStore()
  await authStore.checkAuth()

  // Permitimos continuar con la navegación
  next()
})

// Guard de navegación afterEach: Se ejecuta después de cada cambio de ruta
router.afterEach(() => {
  // Ocultamos el indicador de carga
  const loadingStore = useLoadingStore()
  loadingStore.hide()
})

// Exportamos el router para usarlo en la aplicación
export default router