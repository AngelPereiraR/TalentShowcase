<template>
  <div class="profile-container">
    <div class="profile-content">
      <div v-if="loading" class="spinner-container">
        <Spinner />
      </div>
      <div v-else>
        <div class="profile-header">
          <div class="header-content">
            <h1 class="profile-title" v-if="user">
              {{ user.username }} - {{ user.email }}
            </h1>
            <div class="profile-info">
              <!-- Información del perfil -->
              <div v-if="profile">
                <p class="profile-fullname" v-if="profile.full_name">
                  Nombre Completo: {{ profile.full_name }}
                </p>
                <p class="profile-professional-title" v-if="profile.title">
                  Título Profesional: {{ profile.title }}
                </p>
                <p class="profile-description" v-if="profile.description">
                  Descripción: {{ profile.description }}
                </p>
              </div>

              <!-- Redes sociales -->
              <div v-if="socialNetworks && socialNetworks.length > 0">
                <p class="social-networks-title">Redes Sociales:</p>
                <ul class="social-networks-list">
                  <li v-for="social in socialNetworks" :key="social.id" class="social-network-item">
                    {{ social.network_name }}: <a :href="social.url" target="_blank">{{ social.url }}</a>
                  </li>
                </ul>
              </div>

              <!-- Mensaje si no hay información -->
              <p class="profile-subtitle" v-if="!profile && !socialNetworks">
                Edita el perfil para añadir más información personal
              </p>
              <p class="profile-subtitle"
                v-else-if="profile && !profile.full_name && !profile.title && !profile.description && (!socialNetworks || socialNetworks.length === 0)">
                Edita el perfil para añadir más información personal
              </p>
            </div>
          </div>
          <div class="profile-sidebar">
            <div class="profile-avatar">
              <img :src="profile?.photo_url" alt="Avatar" v-if="profile" class="avatar-image">
              <i class="fas fa-user-circle avatar-icon" v-else></i>
            </div>
            <div class="profile-actions">
              <router-link v-if="isOwnProfile" :to="{ name: 'EditProfile', params: { id: user?.id } }"
                class="action-item">
                <i class="fas fa-id-card"></i>
                <span class="action-text">Editar Datos del perfil</span>
              </router-link>
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
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'Profile',
  components: {
    Spinner
  },
  data() {
    return {
      user: null,
      profile: null,
      socialNetworks: null,
      loading: true,
      error: null
    }
  },
  computed: {
    isOwnProfile() {
      const authStore = useAuthStore();
      const route = useRoute();
      return authStore.getUserId === parseInt(route.params.id);
    }
  },
  async created() {
    await this.fetchInfo()
  },
  watch: {
    '$route.params.id': {
      handler: function (newId, oldId) {
        if (newId !== oldId) {
          this.fetchInfo()
        }
      }
    }
  },
  methods: {
    async fetchInfo() {
      try {
        const route = useRoute();
        const userId = route.params.id;

        // Obtener usuario
        const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/users/${userId}`);
        this.user = userResponse.data.user;

        // Obtener perfil
        const profileResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/profiles/user/${userId}`);
        this.profile = profileResponse.data;

        // Obtener redes sociales
        if (this.profile) {
          const socialResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/social-networks/profile/${this.profile.id}`);
          this.socialNetworks = socialResponse.data;
        }
      } catch (error) {
        this.error = 'Error al cargar los datos del perfil';
        console.error(error);
      } finally {
        this.loading = false;
      }
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

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.profile-info {
  margin-bottom: 2rem;
}

.profile-fullname,
.profile-professional-title,
.profile-description {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
  margin-bottom: 0.5rem;
}

.social-networks-title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  color: var(--neutral-textos-900);
  margin-bottom: 0.5rem;
}

.social-networks-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.social-network-item {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
  margin-bottom: 0.5rem;
}

.social-network-item a {
  color: var(--primario-500);
  text-decoration: none;
}

.social-network-item a:hover {
  text-decoration: underline;
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
  width: 16rem;
}

.avatar-image {
  width: 100%;
  border-radius: 50%;
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
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .profile-header {
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