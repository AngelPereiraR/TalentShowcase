import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
      localStorage.setItem('token', newToken);
    },
    setUser(userData) {
      this.user = userData;
    },
    clearAuth() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
    async checkAuth() {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        this.setToken(savedToken);

        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${savedToken}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            this.setUser(userData);
          } else {
            this.clearAuth();
          }
        } catch (error) {
          console.error('Error al verificar el token:', error);
          this.clearAuth();
        }
      }
    },
    async logout() {
      if (this.token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
          });

          if (response.ok) {
            this.clearAuth();
          } else {
            console.error('Error al cerrar sesión:', response.status);
          }
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      } else {
        this.clearAuth();
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserId: (state) => state.user?.id || null
  }
});