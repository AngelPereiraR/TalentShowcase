<template>
  <!-- Página de edición de perfil con soporte para modo oscuro -->
  <div class="edit-profile" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <!-- Contenedor de pestañas -->
      <div class="tabs-container">
        <!-- Lista de pestañas -->
        <ul class="tabs">
          <!-- Pestaña Información Personal -->
          <li class="tab" :class="{ active: activeTab === 'personal' }" @click="activeTab = 'personal'">
            <span class="tab-text">Información Personal</span>
          </li>
          <!-- Pestaña Experiencia Profesional -->
          <li class="tab" :class="{ active: activeTab === 'experience' }" @click="activeTab = 'experience'">
            <span class="tab-text">Experiencia Profesional</span>
          </li>
          <!-- Pestaña Educación -->
          <li class="tab" :class="{ active: activeTab === 'education' }" @click="activeTab = 'education'">
            <span class="tab-text">Educación</span>
          </li>
          <!-- Pestaña Habilidades -->
          <li class="tab" :class="{ active: activeTab === 'skills' }" @click="activeTab = 'skills'">
            <span class="tab-text">Habilidades</span>
          </li>
          <!-- Pestaña Proyectos Destacados -->
          <li class="tab" :class="{ active: activeTab === 'projects' }" @click="activeTab = 'projects'">
            <span class="tab-text">Proyectos Destacados</span>
          </li>
        </ul>
      </div>

      <!-- Contenido de las pestañas -->
      <div class="tab-content">
        <!-- Componente de Información Personal cuando la pestaña activa es 'personal' -->
        <EditPersonalInfo v-if="activeTab === 'personal'" />
        <!-- Componente de Experiencia Profesional cuando la pestaña activa es 'experience' -->
        <EditProfessionalExperience v-if="activeTab === 'experience'" />
        <!-- Componente de Educación cuando la pestaña activa es 'education' -->
        <EditEducation v-if="activeTab === 'education'" />
        <!-- Componente de Habilidades cuando la pestaña activa es 'skills' -->
        <EditSkills v-if="activeTab === 'skills'" />
        <!-- Componente de Proyectos Destacados cuando la pestaña activa es 'projects' -->
        <EditFeaturedProjects v-if="activeTab === 'projects'" />
      </div>

      <!-- Enlace para volver al perfil -->
      <router-link v-if="user" :to="{ name: 'Profile', params: { id: user.id } }" class="back-to-profile"
        @click="goBackToProfile">
        Volver al perfil
      </router-link>
    </div>
  </div>
</template>

<script>
// Importación de dependencias y componentes necesarios
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
    // Propiedad computada para determinar si está activado el modo oscuro
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  },
  data() {
    return {
      // Pestaña activa por defecto
      activeTab: 'personal',
      // Datos del usuario
      user: null,
      // Estado de carga
      loading: true
    };
  },
  methods: {
    // Método para obtener los datos del usuario
    async fetchUser() {
      this.loading = true;
      try {
        const route = useRoute();
        const userId = route.params.id;

        // Realizar solicitud para obtener los datos del usuario
        const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/users/${userId}`);
        this.user = userResponse.data.user;
      } catch (error) {
        // Manejo de errores
        console.error('Error al cargar el usuario:', error);
        this.user = null;
      } finally {
        this.loading = false;
      }
    },
    // Método para regresar al perfil
    goBackToProfile() {
      this.$router.push({ name: 'Profile', params: { id: this.user.id } });
    },
    // Método para verificar la autorización del usuario
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
    // Verificar autorización al cargar el componente
    const isAuthorized = this.checkUserAuthorization();
    if (!isAuthorized) return;

    // Obtener datos del usuario
    await this.fetchUser();
    if (!this.user) {
      this.$router.push({ name: 'NotFound' });
    }
  }
};
</script>

<style scoped>
/* Estilos base para la página de edición de perfil */
.edit-profile {
  padding: 16rem 0 10rem;
  background-color: var(--neutral-textos-50);
  min-height: 95vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilos para el contenedor de pestañas */
.tabs-container {
  margin-bottom: 2rem;
}

/* Estilos para las pestañas */
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

/* Estilos para el contenido de las pestañas */
.tab-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--neutral-textos-50);
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
}

/* Estilos para el botón de volver al perfil */
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

/* Estilos para modo oscuro */
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

/* Adaptaciones para tablets */
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

/* Adaptaciones para móviles */
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