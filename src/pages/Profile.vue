<template>
  <!-- Contenedor principal del perfil con soporte para modo oscuro -->
  <div class="profile-container" :class="{ 'dark-mode': isDarkMode }">
    <div class="profile-content">
      <!-- Spinner de carga mientras se obtienen los datos -->
      <div v-if="loading" class="spinner-container">
        <Spinner />
      </div>
      <!-- Contenido del perfil cuando los datos están cargados -->
      <div v-else>
        <!-- Cabecera del perfil -->
        <div class="profile-header">
          <div class="header-content">
            <!-- Título del perfil con nombre de usuario y email -->
            <h1 class="profile-title" v-if="user" :class="{ 'dark-mode': isDarkMode }">
              {{ user.username }} - {{ user.email }}
            </h1>
            <!-- Información del perfil -->
            <div class="profile-info">
              <!-- Información básica del perfil -->
              <div v-if="profile">
                <p class="profile-fullname" v-if="profile.full_name" :class="{ 'dark-mode': isDarkMode }">
                  Nombre Completo: {{ profile.full_name }}
                </p>
                <p class="profile-professional-title" v-if="profile.title" :class="{ 'dark-mode': isDarkMode }">
                  Título Profesional: {{ profile.title }}
                </p>
                <p class="profile-description" v-if="profile.description" :class="{ 'dark-mode': isDarkMode }">
                  Descripción: {{ profile.description }}
                </p>
              </div>

              <!-- Redes sociales -->
              <div v-if="socialNetworks && socialNetworks.length > 0">
                <p class="social-networks-title" :class="{ 'dark-mode': isDarkMode }">Redes Sociales:</p>
                <ul class="social-networks-list">
                  <li v-for="social in socialNetworks" :key="social.id" class="social-network-item"
                    :class="{ 'dark-mode': isDarkMode }">
                    {{ social.network_name }}: <a :href="social.url" target="_blank">{{ social.url }}</a>
                  </li>
                </ul>
              </div>

              <!-- Mensaje si no hay información -->
              <p class="profile-subtitle" v-if="!profile && !socialNetworks" :class="{ 'dark-mode': isDarkMode }">
                Edita el perfil para añadir más información personal
              </p>
              <p class="profile-subtitle"
                v-else-if="profile && !profile.full_name && !profile.title && !profile.description && (!socialNetworks || socialNetworks.length === 0)"
                :class="{ 'dark-mode': isDarkMode }">
                Edita el perfil para añadir más información personal
              </p>
            </div>
          </div>
          <!-- Barra lateral con avatar y acciones -->
          <div class="profile-sidebar">
            <!-- Avatar del usuario -->
            <div class="profile-avatar">
              <img :src="profile?.photo_url" alt="Avatar" v-if="profile" class="avatar-image">
              <i class="fas fa-user-circle avatar-icon" v-else></i>
            </div>
            <!-- Acciones disponibles (solo para el propio perfil) -->
            <div class="profile-actions">
              <router-link v-if="isOwnProfile" :to="{ name: 'EditProfile', params: { id: user?.id } }"
                :class="{ 'dark-mode': isDarkMode }" class="action-item">
                <i class="fas fa-id-card"></i>
                <span class="action-text">Editar Datos del perfil</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Sección de Experiencia Profesional -->
        <div class="profile-section">
          <h2 class="section-title" :class="{ 'dark-mode': isDarkMode }">Experiencia Profesional</h2>
          <div v-if="professionalExperiences && professionalExperiences.length > 0">
            <div v-for="experience in professionalExperiences" :key="experience.id" class="experience-item"
              :class="{ 'dark-mode': isDarkMode }">
              <h3 class="experience-title" :class="{ 'dark-mode': isDarkMode }">
                {{ experience.company }} - {{ experience.position }}
              </h3>
              <p class="experience-dates" :class="{ 'dark-mode': isDarkMode }">
                {{ formatDate(experience.start_date) }} - {{ experience.end_date ? formatDate(experience.end_date) :
                  'Actualidad' }}
              </p>
              <p class="experience-description" v-if="experience.description" :class="{ 'dark-mode': isDarkMode }">
                {{ experience.description }}
              </p>
            </div>
          </div>
          <p v-else class="section-subtitle" :class="{ 'dark-mode': isDarkMode }">
            Edita el perfil para añadir tu experiencia profesional
          </p>
        </div>

        <!-- Sección de Educación -->
        <div class="profile-section">
          <h2 class="section-title" :class="{ 'dark-mode': isDarkMode }">Educación</h2>
          <div v-if="education && education.length > 0">
            <div v-for="edu in education" :key="edu.id" class="education-item" :class="{ 'dark-mode': isDarkMode }">
              <h3 class="education-title" :class="{ 'dark-mode': isDarkMode }">
                {{ edu.institution }} - {{ edu.degree }}
              </h3>
              <p class="education-dates" :class="{ 'dark-mode': isDarkMode }">
                {{ formatDate(edu.start_date) }} - {{ formatDate(edu.end_date) }}
              </p>
              <p class="education-description" v-if="edu.description" :class="{ 'dark-mode': isDarkMode }">
                {{ edu.description }}
              </p>
            </div>
          </div>
          <p v-else class="section-subtitle" :class="{ 'dark-mode': isDarkMode }">
            Edita el perfil para añadir tu educación
          </p>
        </div>

        <!-- Sección de Habilidades -->
        <div class="profile-section">
          <h2 class="section-title" :class="{ 'dark-mode': isDarkMode }">Habilidades</h2>
          <div v-if="skills && skills.length > 0" class="skills-container">
            <div v-for="skill in skills" :key="skill.id" class="skill-badge">
              {{ skill.skill }}
            </div>
          </div>
          <p v-else class="section-subtitle" :class="{ 'dark-mode': isDarkMode }">
            Edita el perfil para añadir tus habilidades
          </p>
        </div>

        <!-- Sección de Proyectos Destacados -->
        <div class="profile-section">
          <h2 class="section-title" :class="{ 'dark-mode': isDarkMode }">Proyectos Destacados</h2>
          <div v-if="featuredProjects && featuredProjects.length > 0">
            <div v-for="project in featuredProjects" :key="project.id" class="project-item"
              :class="{ 'dark-mode': isDarkMode }">
              <h3 class="project-title" :class="{ 'dark-mode': isDarkMode }">
                {{ project.title }}
              </h3>
              <p class="project-description" v-if="project.description" :class="{ 'dark-mode': isDarkMode }">
                {{ project.description }}
              </p>
              <p class="project-url" v-if="project.url" :class="{ 'dark-mode': isDarkMode }">
                <a :href="project.url" target="_blank" :class="{ 'dark-mode': isDarkMode }">{{ project.url }}</a>
              </p>
              <p class="project-dates" :class="{ 'dark-mode': isDarkMode }">
                {{ formatDate(project.start_date) }} - {{ formatDate(project.end_date) }}
              </p>
            </div>
          </div>
          <p v-else class="section-subtitle" :class="{ 'dark-mode': isDarkMode }">
            Edita el perfil para añadir tus proyectos
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importación de dependencias y componentes necesarios
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'Profile',
  components: {
    Spinner
  },
  data() {
    return {
      // Datos del perfil y estado de carga
      user: null,
      profile: null,
      socialNetworks: null,
      professionalExperiences: null,
      education: null,
      skills: null,
      featuredProjects: null,
      loading: true,
      error: null
    }
  },
  computed: {
    // Propiedad computada para el modo oscuro
    isDarkMode() {
      return useThemeStore().isDarkMode;
    },
    // Determina si es el perfil propio del usuario autenticado
    isOwnProfile() {
      const authStore = useAuthStore();
      const route = useRoute();
      return authStore.getUserId === parseInt(route.params.id);
    }
  },
  async created() {
    // Ciclo de vida: Cuando el componente se crea, carga los datos
    await this.fetchInfo();
    // Redirecciona a la página de error si el usuario no existe
    if (this.user === null) {
      this.$router.push({ name: "NotFound" });
    }
    // Configura un watcher para detectar cambios en la autenticación
    const authStore = useAuthStore();
    this.authStore = authStore;
    this.unwatchAuth = this.$watch(
      () => this.authStore.isAuthenticated,
      (isAuthenticated) => {
        if (!isAuthenticated) {
          window.location.reload();
        }
      }
    );
  },
  beforeUnmount() {
    // Limpia el watcher al desmontar el componente
    this.unwatchAuth();
  },
  watch: {
    // Recarga la página al cambiar de usuario
    '$route.params.id': {
      handler: function (newId, oldId) {
        if (newId !== oldId) {
          window.location.reload();
        }
      }
    }
  },
  methods: {
    // Método para obtener todos los datos del perfil
    async fetchInfo() {
      try {
        const route = useRoute();
        const userId = route.params.id;

        // Obtiene los datos del usuario
        const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/users/${userId}`);
        this.user = userResponse.data.user;

        // Obtiene los datos del perfil
        const profileResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/profiles/user/${userId}`);
        this.profile = profileResponse.data;

        // Obtiene las redes sociales si hay perfil
        if (this.profile) {
          const socialResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/social-networks/profile/${this.profile.id}`);
          this.socialNetworks = socialResponse.data;
        }

        // Obtiene la experiencia profesional
        const professionalExperiencesResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/professional-experience/profile/${this.profile?.id}`);
        this.professionalExperiences = professionalExperiencesResponse.data;

        // Obtiene la educación
        const educationResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/education/profile/${this.profile?.id}`);
        this.education = educationResponse.data;

        // Obtiene las habilidades
        const skillsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/skills/profile/${this.profile?.id}`);
        this.skills = skillsResponse.data;

        // Obtiene los proyectos destacados
        const featuredProjectsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/projects/profile/${this.profile?.id}`);
        this.featuredProjects = featuredProjectsResponse.data;

      } catch (error) {
        // Manejo de errores
        this.error = 'Error al cargar los datos del perfil';
        console.error(error);
      } finally {
        // Cambia el estado de carga
        this.loading = false;
      }
    },
    // Formatea fechas para mostrar en el perfil
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
    }
  }
}
</script>

<style scoped>
/* Estilos base para el contenedor del perfil */
.profile-container {
  display: flex;
  min-height: 100vh;
  padding: 6rem 0;
}

.profile-container.dark-mode {
  background-color: var(--primario-900);
}

/* Estilos para el contenido principal del perfil */
.profile-content {
  flex: 1;
  padding: 2rem;
}

/* Contenedor del spinner de carga */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

/* Estilos para la cabecera del perfil */
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
}

/* Estilos para el contenido de la cabecera */
.header-content {
  flex: 1;
}

/* Estilos para la barra lateral */
.profile-sidebar {
  width: 300px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-sidebar.dark-mode {
  background-color: var(--primario-800);
}

/* Estilos para el título del perfil */
.profile-title {
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-title-desktop);
  margin-bottom: 0.5rem;
}

.profile-title.dark-mode {
  color: var(--neutral-textos-200);
}

/* Estilos para la información del perfil */
.profile-info {
  margin-bottom: 2rem;
}

/* Estilos para los campos de información del perfil */
.profile-fullname,
.profile-professional-title,
.profile-description {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  margin-bottom: 0.5rem;
}

.profile-fullname.dark-mode,
.profile-professional-title.dark-mode,
.profile-description.dark-mode {
  color: var(--neutral-textos-400);
}

/* Estilos para el título de redes sociales */
.social-networks-title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  margin-bottom: 0.5rem;
}

.social-networks-title.dark-mode {
  color: var(--neutral-textos-400);
}

/* Estilos para los items de redes sociales */
.social-network-item {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  margin-bottom: 0.5rem;
}

.social-network-item.dark-mode {
  color: var(--neutral-textos-300);
}

.social-network-item.dark-mode a {
  color: var(--hover-300);
}

/* Estilos para los subtítulos del perfil */
.profile-subtitle {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  margin-bottom: 2rem;
}

.profile-subtitle.dark-mode {
  color: var(--neutral-textos-500);
}

/* Estilos para los títulos de sección */
.section-title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  margin-bottom: 0.5rem;
}

.section-title.dark-mode {
  color: var(--neutral-textos-200);
}

/* Estilos para los subtítulos de sección */
.section-subtitle {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  margin-bottom: 2rem;
}

.section-subtitle.dark-mode {
  color: var(--neutral-textos-500);
}

/* Estilos para las secciones del perfil */
.profile-section {
  margin-bottom: 3rem;
}

/* Estilos para el avatar */
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
  border: 3px solid var(--primario-500);
  border-radius: 50%;
  padding: 1rem;
  background-color: var(--neutral-textos-100);
}

.avatar-icon.dark-mode {
  color: var(--primario-400);
  border-color: var(--primario-400);
  background-color: var(--primario-800);
}

/* Estilos para las acciones del perfil */
.profile-actions {
  width: 100%;
}

.action-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
}

.action-item.dark-mode {
  color: var(--hover-300);
}

.action-item i {
  margin-right: 0.5rem;
}

.action-text {
  font-size: var(--font-size-text-normal);
}

/* Estilos para los items de experiencia, educación y proyectos */
.experience-item,
.education-item,
.project-item {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 1.5rem;
}

.experience-item.dark-mode,
.education-item.dark-mode,
.project-item.dark-mode {
  background-color: var(--primario-800);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
}

/* Estilos para los títulos de experiencia, educación y proyectos */
.experience-title,
.education-title,
.project-title {
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-title);
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.experience-title.dark-mode,
.education-title.dark-mode,
.project-title.dark-mode {
  color: var(--neutral-textos-200);
}

/* Estilos para las fechas de experiencia, educación y proyectos */
.experience-dates,
.education-dates,
.project-dates {
  color: var(--neutral-textos-500);
  margin-bottom: 0.75rem;
}

.experience-dates.dark-mode,
.education-dates.dark-mode,
.project-dates.dark-mode {
  color: var(--neutral-textos-200);
}

/* Estilos para las descripciones de experiencia, educación y proyectos */
.experience-description,
.education-description,
.project-description {
  color: var(--neutral-textos-700);
  margin-bottom: 0.75rem;
}

.experience-description.dark-mode,
.education-description.dark-mode,
.project-description.dark-mode {
  color: var(--neutral-textos-200);
}

/* Estilos para los enlaces de proyectos */
.project-url {
  margin-bottom: 0.75rem;
}

.project-url.dark-mode {
  color: var(--neutral-textos-200);
}

.project-url a {
  color: var(--primario-500);
  text-decoration: none;
}

.project-url a.dark-mode {
  color: var(--hover-200);
}

.project-url a:hover {
  text-decoration: underline;
}

/* Estilos para las habilidades */
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-badge {
  background-color: var(--primario-100);
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  color: var(--primario-900);
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
}

.skill-badge.dark-mode {
  background-color: var(--primario-700);
  color: var(--neutral-textos-200);
}

/* Adaptaciones para pantallas pequeñas */
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