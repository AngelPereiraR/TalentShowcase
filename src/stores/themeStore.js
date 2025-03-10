import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false
  }),
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      // Guardar preferencia en localStorage
      localStorage.setItem('darkMode', this.isDarkMode);
    },
    loadThemePreference() {
      const savedPreference = localStorage.getItem('darkMode');
      if (savedPreference !== null) {
        this.isDarkMode = JSON.parse(savedPreference);
      }
    }
  }
});