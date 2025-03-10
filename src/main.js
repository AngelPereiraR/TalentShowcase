import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
import { useThemeStore } from './stores/themeStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');

// Cargar preferencia de tema al inicio de la aplicación
const themeStore = useThemeStore();
themeStore.loadThemePreference();