// Importamos la función defineStore de Pinia para crear nuestro store de autenticación
import { defineStore } from 'pinia';

// Definimos nuestro store de autenticación usando defineStore
// El primer argumento es el identificador único del store
export const useAuthStore = defineStore('auth', {
  // Definición del estado del store
  state: () => ({
    // Token de autenticación (null por defecto)
    token: null,
    // Información del usuario autenticado (null por defecto)
    user: null
  }),
  // Definición de acciones (métodos) del store
  actions: {
    // Acción para establecer el token de autenticación
    setToken(newToken) {
      this.token = newToken;
      // Guardamos el token en localStorage para persistencia
      localStorage.setItem('token', newToken);
    },
    // Acción para establecer los datos del usuario
    setUser(userData) {
      this.user = userData;
    },
    // Acción para limpiar la autenticación (logout)
    clearAuth() {
      this.token = null;
      this.user = null;
      // Eliminamos el token de localStorage
      localStorage.removeItem('token');
    },
    // Acción asíncrona para verificar la autenticación
    async checkAuth() {
      // Obtenemos el token guardado de localStorage
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        // Establecemos el token en el store
        this.setToken(savedToken);

        try {
          // Hacemos una solicitud al backend para verificar el token
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${savedToken}`
            }
          });

          if (response.ok) {
            // Si la respuesta es correcta, obtenemos los datos del usuario
            const userData = await response.json();
            this.setUser(userData);
          } else {
            // Si la respuesta no es correcta, limpiamos la autenticación
            this.clearAuth();
          }
        } catch (error) {
          // En caso de error, lo mostramos por consola y limpiamos la autenticación
          console.error('Error al verificar el token:', error);
          this.clearAuth();
        }
      }
    },
    // Acción asíncrona para cerrar sesión
    async logout() {
      // Comprobamos si hay un token válido
      if (this.token) {
        try {
          // Hacemos una solicitud al backend para cerrar sesión
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
          });

          if (response.ok) {
            // Si la respuesta es correcta, limpiamos la autenticación
            this.clearAuth();
          } else {
            // Si la respuesta no es correcta, mostramos un error
            console.error('Error al cerrar sesión:', response.status);
          }
        } catch (error) {
          // En caso de error, lo mostramos por consola
          console.error('Error al cerrar sesión:', error);
        }
      } else {
        // Si no hay token, simplemente limpiamos la autenticación
        this.clearAuth();
      }
    }
  },
  // Definición de getters (propiedades computadas)
  getters: {
    // Getter para determinar si el usuario está autenticado
    isAuthenticated: (state) => !!state.token,
    // Getter para obtener el ID del usuario si está autenticado
    getUserId: (state) => state.user?.id || null
  }
});