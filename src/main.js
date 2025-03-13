import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
import { useThemeStore } from './stores/themeStore';

// Creamos una instancia de la aplicación Vue
const app = createApp(App);

// Creamos una instancia de Pinia para gestión de estado
const pinia = createPinia();

// Usamos Pinia en nuestra aplicación
app.use(pinia);
// Usamos el router en nuestra aplicación
app.use(router);

// Montamos la aplicación en el elemento DOM con id 'app'
app.mount('#app');

// Cargamos la preferencia de tema guardada al inicio de la aplicación
// Accedemos al store de tema
const themeStore = useThemeStore();
// Llamamos al método loadThemePreference del store para cargar las preferencias
themeStore.loadThemePreference();