<template>
  <div class="edit-profile" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="tabs-container">
        <ul class="tabs">
          <li class="tab" :class="{ active: activeTab === 'personal' }" @click="activeTab = 'personal'">
            <span class="tab-text">Información Personal</span>
          </li>
          <li class="tab" :class="{ active: activeTab === 'experience' }" @click="activeTab = 'experience'">
            <span class="tab-text">Experiencia Profesional</span>
          </li>
          <li class="tab" :class="{ active: activeTab === 'education' }" @click="activeTab = 'education'">
            <span class="tab-text">Educación</span>
          </li>
          <li class="tab" :class="{ active: activeTab === 'skills' }" @click="activeTab = 'skills'">
            <span class="tab-text">Habilidades</span>
          </li>
          <li class="tab" :class="{ active: activeTab === 'projects' }" @click="activeTab = 'projects'">
            <span class="tab-text">Proyectos Destacados</span>
          </li>
        </ul>
      </div>

      <div class="tab-content">
        <EditPersonalInfo v-if="activeTab === 'personal'" />
        <EditProfessionalExperience v-if="activeTab === 'experience'" />
        <EditEducation v-if="activeTab === 'education'" />
        <EditSkills v-if="activeTab === 'skills'" />
        <EditFeaturedProjects v-if="activeTab === 'projects'" />
      </div>

      <router-link v-if="user" :to="{ name: 'Profile', params: { id: user.id } }" class="back-to-profile"
        @click="goBackToProfile">
        Volver al perfil
      </router-link>
    </div>
  </div>
</template>

<script>
import { useThemeStore } from '../stores/themeStore';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import EditPersonalInfo from '../components/EditPersonalInfo.vue';
import EditProfessionalExperience from '../components/EditProfessionalExperience.vue';
import EditEducation from '../components/EditEducation.vue';
import EditSkills from '../components/EditSkills.vue';
import EditFeaturedProjects from '../components/EditFeaturedProjects.vue';
import axios from 'axios';

export default {
  name: 'EditProfile',
  components: {
    EditPersonalInfo,
    EditProfessionalExperience,
    EditEducation,
    EditSkills,
    EditFeaturedProjects
  },
  computed: {
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  },
  data() {
    return {
      activeTab: 'personal',
      user: null,
      loading: true
    };
  },
  methods: {
    async fetchUser() {
      this.loading = true;
      try {
        const route = useRoute();
        const userId = route.params.id;

        // Obtener usuario
        const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/users/${userId}`);
        this.user = userResponse.data.user;
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
        this.user = null;
      } finally {
        this.loading = false;
      }
    },
    goBackToProfile() {
      this.$router.push({ name: 'Profile', params: { id: this.user.id } });
    },
    checkUserAuthorization() {
      const authStore = useAuthStore();
      const route = useRoute();
      const router = useRouter();

      // Si no hay usuario autenticado, redirigir al login
      if (!authStore.isAuthenticated) {
        router.push({ name: 'Login' });
        return false;
      }

      // Si el usuario autenticado no coincide con el ID de la ruta, redirigir a la página de error 404
      if (authStore.user.id !== parseInt(route.params.id)) {
        router.push({ name: 'NotFound' });
        return false;
      }

      return true;
    }
  },
  async created() {
    const isAuthorized = this.checkUserAuthorization();
    if (!isAuthorized) return;

    await this.fetchUser();
    if (!this.user) {
      this.$router.push({ name: 'NotFound' });
    }
  }
};
</script>

<style scoped>
.edit-profile {
  padding: 16rem 0 10rem;
  background-color: var(--neutral-textos-50);
  min-height: 95vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.tabs-container {
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 2px solid var(--primario-100);
}

.tab {
  padding: 1rem 2rem;
  margin: 0 0.5rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  color: var(--neutral-textos-700);
}

.tab.active {
  border-bottom: 2px solid var(--primario-500);
  color: var(--primario-500);
}

.tab-text {
  display: block;
}

.tab-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--neutral-textos-50);
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
}

.back-to-profile {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 1rem;
  background-color: var(--primario-500);
  color: white;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  text-decoration: none;
}

.back-to-profile:hover {
  background-color: var(--primario-600);
}

/* Modo oscuro */
.edit-profile.dark-mode {
  background-color: var(--primario-900);
}

.edit-profile.dark-mode .tabs {
  border-bottom-color: var(--primario-700);
}

.edit-profile.dark-mode .tab {
  color: var(--neutral-textos-400);
}

.edit-profile.dark-mode .tab.active {
  border-bottom-color: var(--botones-300);
  color: var(--botones-300);
}

.edit-profile.dark-mode .tab-content {
  background-color: var(--primario-700);
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-900), 0.2);
}

.edit-profile.dark-mode .back-to-profile {
  background-color: var(--botones-300);
}

.edit-profile.dark-mode .back-to-profile:hover {
  background-color: var(--botones-400);
}

/* Media Queries para tablets */
@media (max-width: 1024px) {
  .edit-profile {
    padding: 14rem 0 8rem;
  }

  .tabs {
    flex-wrap: wrap;
  }

  .tab {
    flex: 1 1 auto;
    padding: 0.75rem 1rem;
    margin: 0.25rem;
  }

  .tab-content {
    max-width: 90%;
    padding: 1.5rem;
  }

  .back-to-profile {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
}

/* Media Queries para móviles */
@media (max-width: 768px) {
  .edit-profile {
    padding: 12rem 0 4rem;
  }

  .tabs {
    flex-direction: column;
  }

  .tab {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.75rem;
  }

  .tab-content {
    max-width: 95%;
    padding: 1rem;
  }

  .back-to-profile {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
}
</style>