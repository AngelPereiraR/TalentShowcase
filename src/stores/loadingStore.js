// Importamos la función defineStore de Pinia para crear nuestro store
import { defineStore } from 'pinia';

// Definimos nuestro store de carga usando defineStore
// El primer argumento es el identificador único del store
export const useLoadingStore = defineStore('loading', {
  // Definición del estado del store
  state: () => ({
    // Estado que controla si se está mostrando el indicador de carga
    isLoading: false
  }),
  // Definición de acciones (métodos) del store
  actions: {
    // Acción para mostrar el indicador de carga
    show() {
      this.isLoading = true;
    },
    // Acción para ocultar el indicador de carga
    hide() {
      this.isLoading = false;
    }
  }
});