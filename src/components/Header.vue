<template>
  <header class="header" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="header__content">
        <div class="logo">
          <img src="@/assets/logo-portfolio.webp" alt="TalentShowcase" />
          <h1 class="logo__title">TalentShowcase</h1>
        </div>
        <nav class="nav__menu">
          <ul>
            <li><router-link :to="{ name: 'Home' }">Inicio</router-link></li>
            <li><router-link :to="{ name: 'Characteristics' }">Características</router-link></li>
            <li><router-link :to="{ name: 'Contact' }">Contacto</router-link></li>
          </ul>
        </nav>
        <div class="header__actions">
          <div class="theme-toggle" :class="{ 'dark-mode': isDarkMode }">
            <input type="checkbox" id="theme-switch" @change="toggleTheme" />
            <label for="theme-switch" class="theme-toggle__label"></label>
          </div>
          <div class="auth-buttons">
            <template v-if="isAuthenticated && userId">
              <router-link :to="{ name: 'Profile', params: { id: userId } }" class="btn--profile">
                <i class="fas fa-user"></i>
                Perfil
              </router-link>
              <button @click="logout" class="btn--logout">
                <i class="fas fa-sign-out-alt"></i>
                Cerrar Sesión
              </button>
            </template>
            <template v-else>
              <router-link :to="{ name: 'Login' }" class="btn--login">
                <i class="fas fa-sign-in-alt"></i>
                Iniciar
              </router-link>
              <router-link :to="{ name: 'Register' }" class="btn--register">
                <i class="fas fa-user-plus"></i>
                Registrarse
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';

export default {
  name: 'Header',
  computed: {
    isAuthenticated() {
      return useAuthStore().isAuthenticated;
    },
    userId() {
      return useAuthStore().getUserId;
    },
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  },
  methods: {
    logout() {
      useAuthStore().logout();
    },
    toggleTheme() {
      useThemeStore().toggleTheme();
    }
  },
  mounted() {
    useThemeStore().loadThemePreference();
  }
}
</script>

<style scoped>
.header {
  background-color: var(--neutral-textos-100);
  padding: 1.5rem 0;
  box-shadow: 0 0.125rem 0.3125rem rgba(var(--sombras-100), 0.1);
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
}

/* Clase específica para modo oscuro */
.header.dark-mode {
  background-color: var(--neutral-textos-800);
  box-shadow: 0 0.125rem 0.3125rem rgba(var(--sombras-100), 0.3);
}

.header.dark-mode * {
  color: var(--neutral-textos-50);
}

.container {
  max-width: 90%;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 4rem;
  margin-right: 0.625rem;
}

.logo__title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  color: var(--neutral-textos-900);
  margin: 0;
}

.nav__menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__menu li {
  margin: 0 1.5rem;
}

.nav__menu a {
  text-decoration: none;
  color: var(--neutral-textos-700);
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: 1rem;
}

.header__actions {
  display: flex;
  align-items: center;
}

.theme-toggle__label {
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.5rem;
  background-color: var(--primario-300);
  border-radius: 1.25rem;
  margin-right: 1.25rem;
  transition: background-color 0.3s;
}

.theme-toggle__label::after {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  background-color: var(--neutral-textos-50);
  border-radius: 50%;
  top: 0.25rem;
  left: 0.25rem;
  transition: transform 0.3s;
}

.theme-toggle input {
  display: none;
}

.theme-toggle.dark-mode input:checked+.theme-toggle__label {
  background-color: var(--primario-50);
}

.theme-toggle.dark-mode input:checked+.theme-toggle__label::after {
  background-color: var(--primario-600);
}

.theme-toggle input:checked+.theme-toggle__label::after {
  transform: translateX(1rem);
}

.auth-buttons .btn--login,
.auth-buttons .btn--register,
.auth-buttons .btn--profile,
.auth-buttons .btn--logout {
  text-decoration: none;
  margin-left: 1.5rem;
  font-size: 1rem;
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
}

.btn--profile {
  color: var(--neutral-textos-700);
}

.btn--logout {
  background-color: var(--errors-500);
  color: var(--neutral-textos-50);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.3125rem;
  cursor: pointer;
}

.btn--logout:hover {
  background-color: var(--errors-600);
}

.btn--login {
  color: var(--neutral-textos-700);
}

.btn--register {
  color: var(--neutral-textos-600);
}

@media (max-width: 1450px) {
  .header__content {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Media Query para Tablet */
@media (max-width: 768px) {
  .header__content {
    flex-direction: column;
    gap: 1rem;
  }

  .logo img {
    height: 3rem;
  }

  .logo__title {
    font-size: var(--font-size-menu-mobile);
  }

  .auth-buttons {
    width: 100%;
    text-align: center;
  }

  .auth-buttons .btn--login,
  .auth-buttons .btn--register {
    margin: 0 0.5rem;
  }
}
</style>