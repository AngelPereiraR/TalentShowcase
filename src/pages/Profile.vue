<template>
  <div class="profile-container">
    <div class="profile-content">
      <div class="profile-header">
        <div class="header-content">
          <h1 class="profile-title" v-if="user">
            {{ user.username }} - {{ user.email }}
          </h1>
          <p class="profile-subtitle">Edita el perfil para añadir más información personal</p>
        </div>
        <div class="profile-sidebar">
          <div class="profile-avatar">
            <i class="fas fa-user-circle avatar-icon"></i>
          </div>
          <div class="profile-actions">
            <div class="action-item">
              <i class="fas fa-id-card"></i>
              <span class="action-text">Editar Datos del perfil</span>
            </div>
            <div class="action-item">
              <i class="fas fa-folder-plus"></i>
              <span class="action-text">Editar Portafolio</span>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h2 class="section-title">Experiencia Profesional</h2>
        <p class="section-subtitle">Edita el perfil para añadir tu experiencia profesional</p>
      </div>

      <div class="profile-section">
        <h2 class="section-title">Educación</h2>
        <p class="section-subtitle">Edita el perfil para añadir tu educación</p>
      </div>

      <div class="profile-section">
        <h2 class="section-title">Habilidades</h2>
        <p class="section-subtitle">Edita el perfil para añadir tus habilidades</p>
      </div>

      <div class="profile-section">
        <h2 class="section-title">Proyectos Destacados</h2>
        <p class="section-subtitle">Edita el perfil para añadir tus proyectos</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore';

export default {
  name: 'Profile',
  computed: {
    user() {
      return useAuthStore().user;
    }
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--neutral-50);
  padding: 6rem 0;
}

.profile-content {
  flex: 1;
  padding: 2rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.header-content {
  flex: 1;
}

.profile-sidebar {
  width: 300px;
  background-color: var(--neutral-100);
  padding: 2rem;
  box-shadow: var(--sombras-100) 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-title {
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-title-desktop);
  color: var(--neutral-textos-900);
  margin-bottom: 0.5rem;
}

.profile-subtitle {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
  margin-bottom: 2rem;
}

.section-title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  color: var(--neutral-textos-900);
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
  margin-bottom: 2rem;
}

.profile-section {
  margin-bottom: 3rem;
}

.profile-avatar {
  margin-bottom: 2rem;
}

.avatar-icon {
  font-size: 7rem;
  color: var(--primario-500);
  border: 3px solid var(--primario-500);
  border-radius: 50%;
  padding: 1rem;
  background-color: var(--neutral-textos-100);
}

.profile-actions {
  width: 100%;
}

.action-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: var(--primario-500);
  text-decoration: none;
  cursor: pointer;
}

.action-item i {
  margin-right: 0.5rem;
}

.action-text {
  font-size: var(--font-size-text-normal);
}

@media (max-width: 1450px) {
  .profile-header {
    padding: 8rem 0;
  }
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    padding: 6rem 0;
  }

  .profile-sidebar {
    width: 100%;
    box-shadow: none;
    border-top: 1px solid var(--neutral-textos-300);
    padding-top: 1.5rem;
    margin-top: 2rem;
  }

  .profile-content {
    max-width: 100%;
  }

  .profile-title {
    font-size: var(--font-size-title-mobile);
  }

  .section-title {
    font-size: var(--font-size-menu-mobile);
  }
}
</style>