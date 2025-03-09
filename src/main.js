import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'

// Crea la aplicación
const app = createApp(App)

// Crea e instancia de Pinia
const pinia = createPinia()

// Usa Pinia y Router en la aplicación
app.use(pinia)
app.use(router)

// Monta la aplicación
app.mount('#app')