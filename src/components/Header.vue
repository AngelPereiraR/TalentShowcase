<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <img src="@/assets/logo-portfolio.webp" alt="TalentShowcase" />
          <h1>TalentShowcase</h1>
        </div>
        <nav class="nav-menu">
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Características</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <div class="language-toggle">
            <span>ES</span>
          </div>
          <div class="theme-toggle">
            <input type="checkbox" id="theme-switch" />
            <label for="theme-switch"></label>
          </div>
          <div class="auth-buttons">
            <a href="#" class="btn-login">Iniciar</a>
            <a href="#" class="btn-register">Registrarse</a>
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
  background-color: white;
  padding: 15px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
}

.container {
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.logo h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin: 0 15px;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
}

.header-actions {
  display: flex;
  align-items: center;
}

.language-toggle {
  margin-right: 20px;
  font-size: 16px;
}

.theme-toggle {
  margin-right: 20px;
}

.theme-toggle input {
  display: none;
}

.theme-toggle label {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  transition: background-color 0.3s;
}

.theme-toggle input:checked+label {
  background-color: #2196F3;
}

.theme-toggle label::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}

.theme-toggle input:checked+label::after {
  transform: translateX(20px);
}

.auth-buttons a {
  text-decoration: none;
  margin-left: 15px;
  font-size: 16px;
}

.btn-login {
  color: #333;
}

.btn-register {
  color: #666;
}
</style>