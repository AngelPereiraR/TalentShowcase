// Importamos la función defineStore de Pinia para crear nuestro store
import { defineStore } from 'pinia';

// Definimos nuestro store de tema usando defineStore
// El primer argumento es el identificador único del store
export const useThemeStore = defineStore('theme', {
  // Definición del estado del store
  state: () => ({
    // Estado que controla si el modo oscuro está activado
    isDarkMode: false
  }),
  // Definición de acciones (métodos) del store
  actions: {
    // Acción para alternar entre modo claro y oscuro
    toggleTheme() {
      // Invertimos el valor actual de isDarkMode
      this.isDarkMode = !this.isDarkMode;
      // Guardamos la preferencia en localStorage para persistencia
      localStorage.setItem('darkMode', this.isDarkMode);
    },
    // Acción para cargar la preferencia de tema guardada previamente
    loadThemePreference() {
      // Obtenemos la preferencia guardada de localStorage
      const savedPreference = localStorage.getItem('darkMode');
      // Si existe una preferencia guardada, la aplicamos
      if (savedPreference !== null) {
        // Parseamos el valor guardado (true/false) y actualizamos el estado
        this.isDarkMode = JSON.parse(savedPreference);
      }
    }
  }
});