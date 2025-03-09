<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <div class="logo">
          <img src="@/assets/logo-portfolio.webp" alt="TalentShowcase" />
          <h1 class="logo__title">TalentShowcase</h1>
        </div>
        <nav class="nav__menu">
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Características</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
        <div class="header__actions">
          <div class="theme-toggle">
            <input type="checkbox" id="theme-switch" />
            <label for="theme-switch" class="theme-toggle__label"></label>
          </div>
          <div class="auth-buttons">
            <a href="#" class="btn--login">Iniciar</a>
            <a href="#" class="btn--register">Registrarse</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
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
  /* Oculta el checkbox */
}

.theme-toggle input:checked+.theme-toggle__label {
  background-color: var(--primario-500);
}

.theme-toggle input:checked+.theme-toggle__label::after {
  transform: translateX(1rem);
}

.auth-buttons .btn--login,
.auth-buttons .btn--register {
  text-decoration: none;
  margin-left: 1.5rem;
  font-size: 1rem;
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
}

.btn--login {
  color: var(--neutral-textos-700);
}

.btn--register {
  color: var(--neutral-textos-600);
}

@media (max-width: 1200px) {
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