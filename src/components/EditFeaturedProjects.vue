<template>
  <!-- Contenedor principal de la sección de edición de proyectos destacados -->
  <div class="edit-section" :class="{ 'dark-mode': isDarkMode }">
    <!-- Título de la sección -->
    <h2 class="section-title">Editar Proyectos Destacados</h2>

    <!-- Formulario para editar proyectos -->
    <form class="form" @submit.prevent="handleSubmit">
      <!-- Spinner de carga mientras se procesan los datos -->
      <div v-if="isLoading" class="spinner-container">
        <Spinner />
      </div>

      <!-- Lista de proyectos existentes -->
      <div v-for="(project, index) in form.projects" :key="index" class="project-item">
        <!-- Campo de entrada para el título del proyecto -->
        <div class="form-group">
          <label :for="'project-title-' + index" class="form-label">Título del proyecto</label>
          <input :id="'project-title-' + index" type="text" class="form-input" v-model="project.title"
            @blur="validateTitle(index)" />
          <!-- Mensaje de error si la validación falla -->
          <div v-if="errors[index] && errors[index].title" class="error-message">
            {{ errors[index].title }}
          </div>
        </div>

        <!-- Campo de entrada para la descripción del proyecto -->
        <div class="form-group">
          <label :for="'project-description-' + index" class="form-label">Descripción del proyecto</label>
          <textarea :id="'project-description-' + index" class="form-textarea" v-model="project.description"
            @blur="validateDescription(index)"></textarea>
          <!-- Mensaje de error si la validación falla -->
          <div v-if="errors[index] && errors[index].description" class="error-message">
            {{ errors[index].description }}
          </div>
        </div>

        <!-- Campo de entrada para la URL del proyecto -->
        <div class="form-group">
          <label :for="'project-url-' + index" class="form-label">URL del proyecto</label>
          <input :id="'project-url-' + index" type="text" class="form-input" v-model="project.url"
            @blur="validateUrl(index)" />
          <!-- Mensaje de error si la validación falla -->
          <div v-if="errors[index] && errors[index].url" class="error-message">
            {{ errors[index].url }}
          </div>
        </div>

        <!-- Campo de entrada para la fecha de inicio -->
        <div class="form-group">
          <label :for="'project-start-date-' + index" class="form-label">Fecha de inicio</label>
          <input :id="'project-start-date-' + index" type="date" class="form-input" v-model="project.start_date"
            @blur="validateStartDate(index)" />
          <!-- Mensaje de error si la validación falla -->
          <div v-if="errors[index] && errors[index].start_date" class="error-message">
            {{ errors[index].start_date }}
          </div>
        </div>

        <!-- Campo de entrada para la fecha de fin -->
        <div class="form-group">
          <label :for="'project-end-date-' + index" class="form-label">Fecha de fin</label>
          <input :id="'project-end-date-' + index" type="date" class="form-input" v-model="project.end_date"
            @blur="validateEndDate(index)" />
          <!-- Mensaje de error si la validación falla -->
          <div v-if="errors[index] && errors[index].end_date" class="error-message">
            {{ errors[index].end_date }}
          </div>
        </div>

        <!-- Botón para eliminar el proyecto -->
        <div class="project-actions">
          <button type="button" class="delete-btn" @click="deleteProject(index)">
            Eliminar
          </button>
        </div>
      </div>

      <!-- Sección para añadir nuevos proyectos -->
      <div class="add-project">
        <!-- Campo de entrada para el título del nuevo proyecto -->
        <div class="form-group">
          <label for="new-project-title" class="form-label">Título del proyecto</label>
          <input type="text" id="new-project-title" class="form-input" v-model="newProject.title"
            @blur="validateNewTitle" />
          <!-- Mensaje de error si la validación falla -->
          <div v-if="newErrors.title" class="error-message">{{ newErrors.title }}</div>
        </div>

        <!-- Campo de entrada para la descripción del nuevo proyecto -->
        <div class="form-group">
          <label for="new-project-description" class="form-label">Descripción del proyecto</label>
          <textarea id="new-project-description" class="form-textarea" v-model="newProject.description"
            @blur="validateNewDescription"></textarea>
          <!-- Mensaje de error si la validación falla -->
          <div v-if="newErrors.description" class="error-message">{{ newErrors.description }}</div>
        </div>

        <!-- Campo de entrada para la URL del nuevo proyecto -->
        <div class="form-group">
          <label for="new-project-url" class="form-label">URL del proyecto</label>
          <input type="text" id="new-project-url" class="form-input" v-model="newProject.url" @blur="validateNewUrl" />
          <!-- Mensaje de error si la validación falla -->
          <div v-if="newErrors.url" class="error-message">{{ newErrors.url }}</div>
        </div>

        <!-- Campo de entrada para la fecha de inicio del nuevo proyecto -->
        <div class="form-group">
          <label for="new-project-start-date" class="form-label">Fecha de inicio</label>
          <input type="date" id="new-project-start-date" class="form-input" v-model="newProject.start_date"
            @blur="validateNewStartDate" />
          <!-- Mensaje de error si la validación falla -->
          <div v-if="newErrors.start_date" class="error-message">{{ newErrors.start_date }}</div>
        </div>

        <!-- Campo de entrada para la fecha de fin del nuevo proyecto -->
        <div class="form-group">
          <label for="new-project-end-date" class="form-label">Fecha de fin</label>
          <input type="date" id="new-project-end-date" class="form-input" v-model="newProject.end_date"
            @blur="validateNewEndDate" />
          <!-- Mensaje de error si la validación falla -->
          <div v-if="newErrors.end_date" class="error-message">{{ newErrors.end_date }}</div>
        </div>

        <!-- Botón para añadir el nuevo proyecto -->
        <button type="button" class="add-btn" @click="addProject" :disabled="hasNewErrors">
          Añadir
        </button>
      </div>

      <!-- Botón para guardar todos los cambios -->
      <button type="submit" class="submit-btn" :disabled="hasErrors">
        Guardar cambios
      </button>
    </form>
  </div>
</template>

<script>
// Importación de dependencias y componentes necesarios
import { useThemeStore } from '../stores/themeStore';
import { useProfileStore } from '../stores/profileStore';
import { useAuthStore } from '../stores/authStore';
import { useRoute } from 'vue-router';
import Spinner from '../components/Spinner.vue';
import axios from 'axios';

export default {
  name: 'EditFeaturedProjects',
  components: {
    Spinner
  },
  computed: {
    // Propiedad computada para determinar si está activado el modo oscuro
    isDarkMode() {
      return useThemeStore().isDarkMode;
    },
    // Propiedad computada para verificar si hay errores en los proyectos existentes
    hasErrors() {
      return this.form.projects.some((project, index) => {
        const projectErrors = this.errors[index];
        return projectErrors && (projectErrors.title || projectErrors.description || projectErrors.url || projectErrors.start_date || projectErrors.end_date);
      });
    },
    // Propiedad computada para verificar si hay errores en el nuevo proyecto
    hasNewErrors() {
      return this.newErrors.title || this.newErrors.description || this.newErrors.url || this.newErrors.start_date || this.newErrors.end_date;
    }
  },
  data() {
    return {
      // Formulario con los proyectos actuales
      form: {
        projects: []
      },
      // Nuevo proyecto a añadir
      newProject: {
        title: '',
        description: '',
        url: '',
        start_date: '',
        end_date: '',
        slug: ''
      },
      // Estado de carga
      isLoading: false,
      // Referencia al store de perfil
      profileStore: useProfileStore(),
      // Referencia al store de autenticación
      authStore: useAuthStore(),
      // Referencia a la ruta actual
      route: useRoute(),
      // Errores de validación para cada proyecto existente
      errors: [],
      // Errores de validación para el nuevo proyecto
      newErrors: {
        title: null,
        description: null,
        url: null,
        start_date: null,
        end_date: null
      },
      // IDs de los proyectos existentes
      existingProjectIds: []
    };
  },
  mounted() {
    // Cargar los proyectos existentes al montar el componente
    this.loadProjects();
  },
  methods: {
    // Método para cargar los proyectos existentes desde la API
    async loadProjects() {
      this.isLoading = true;
      try {
        // Realizar solicitud para obtener los proyectos del perfil
        const projectsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/projects/profile/${this.profileStore.profile.id}`,
          {
            headers: {
              'Authorization': `Bearer ${this.authStore.token}`
            }
          }
        );
        const projectsData = projectsResponse.data;
        // Actualizar el store de perfil con los proyectos cargados
        this.profileStore.setProjects(projectsData);
        // Asignar los proyectos al formulario
        this.form.projects = projectsData || [];
        // Guardar los IDs de los proyectos existentes
        this.existingProjectIds = projectsData.map(project => project.id);
      } catch (error) {
        // Manejo de errores
        console.error('Error al cargar los proyectos:', error);
      } finally {
        // Cambiar el estado de carga
        this.isLoading = false;
      }
    },
    // Método para validar el título de un proyecto existente
    validateTitle(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].title) {
        this.errors[index].title = 'El campo Título del proyecto es obligatorio';
      } else {
        this.errors[index].title = null;
      }
    },
    // Método para validar la descripción de un proyecto existente
    validateDescription(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].description) {
        this.errors[index].description = 'El campo Descripción del proyecto es obligatorio';
      } else {
        this.errors[index].description = null;
      }
    },
    // Método para validar la URL de un proyecto existente
    validateUrl(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].url) {
        this.errors[index].url = 'El campo URL del proyecto es obligatorio';
      } else {
        this.errors[index].url = null;
      }
    },
    // Método para validar la fecha de inicio de un proyecto existente
    validateStartDate(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].start_date) {
        this.errors[index].start_date = 'El campo Fecha de inicio es obligatorio';
      } else {
        this.errors[index].start_date = null;
      }
    },
    // Método para validar la fecha de fin de un proyecto existente
    validateEndDate(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].end_date) {
        this.errors[index].end_date = 'El campo Fecha de fin es obligatorio';
      } else {
        this.errors[index].end_date = null;
      }
    },
    // Método para validar el título del nuevo proyecto
    validateNewTitle() {
      if (!this.newProject.title) {
        this.newErrors.title = 'El campo Título del proyecto es obligatorio';
      } else {
        this.newErrors.title = null;
      }
    },
    // Método para validar la descripción del nuevo proyecto
    validateNewDescription() {
      if (!this.newProject.description) {
        this.newErrors.description = 'El campo Descripción del proyecto es obligatorio';
      } else {
        this.newErrors.description = null;
      }
    },
    // Método para validar la URL del nuevo proyecto
    validateNewUrl() {
      if (!this.newProject.url) {
        this.newErrors.url = 'El campo URL del proyecto es obligatorio';
      } else {
        this.newErrors.url = null;
      }
    },
    // Método para validar la fecha de inicio del nuevo proyecto
    validateNewStartDate() {
      if (!this.newProject.start_date) {
        this.newErrors.start_date = 'El campo Fecha de inicio es obligatorio';
      } else {
        this.newErrors.start_date = null;
      }
    },
    // Método para validar la fecha de fin del nuevo proyecto
    validateNewEndDate() {
      if (!this.newProject.end_date) {
        this.newErrors.end_date = 'El campo Fecha de fin es obligatorio';
      } else {
        this.newErrors.end_date = null;
      }
    },
    // Método para añadir un nuevo proyecto
    addProject() {
      this.validateNewTitle();
      this.validateNewDescription();
      this.validateNewUrl();
      this.validateNewStartDate();
      this.validateNewEndDate();

      if (!this.hasNewErrors) {
        // Generar slug para el nuevo proyecto
        this.newProject.slug = this.generateSlug(this.newProject.title);

        // Añadir el nuevo proyecto al formulario
        this.form.projects.push({ ...this.newProject });
        // Resetear el campo de nuevo proyecto
        this.newProject = {
          title: '',
          description: '',
          url: '',
          start_date: '',
          end_date: '',
          slug: ''
        };
        // Limpiar errores de validación del nuevo proyecto
        this.newErrors = {
          title: null,
          description: null,
          url: null,
          start_date: null,
          end_date: null
        };
      }
    },
    // Método para eliminar un proyecto existente
    deleteProject(index) {
      // Eliminar el proyecto del formulario
      this.form.projects.splice(index, 1);
      // Eliminar el error correspondiente
      this.errors.splice(index, 1);
    },
    // Método para generar un slug a partir del título
    generateSlug(title) {
      return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    },
    // Método para enviar el formulario y guardar los cambios
    async handleSubmit() {
      // Validar todos los proyectos existentes
      this.form.projects.forEach((project, index) => {
        this.validateTitle(index);
        this.validateDescription(index);
        this.validateUrl(index);
        this.validateStartDate(index);
        this.validateEndDate(index);
      });

      if (!this.hasErrors) {
        try {
          this.isLoading = true;
          // Eliminar todos los proyectos existentes en la base de datos
          if (this.existingProjectIds.length > 0) {
            for (const projectId of this.existingProjectIds) {
              try {
                await axios.delete(
                  `${import.meta.env.VITE_BACKEND_URL}api/projects/${projectId}`,
                  {
                    headers: {
                      'Authorization': `Bearer ${this.authStore.token}`
                    }
                  }
                );
              } catch (error) {
                console.error('Error al eliminar el proyecto:', error);
              }
            }
          }

          // Limpiar los proyectos en el store de perfil
          this.profileStore.setProjects([]);

          // Añadir los nuevos proyectos uno por uno
          for (const project of this.form.projects) {
            try {
              const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}api/projects`,
                {
                  profile_id: this.profileStore.profile.id,
                  title: project.title,
                  description: project.description,
                  url: project.url,
                  start_date: project.start_date,
                  end_date: project.end_date,
                  slug: project.slug
                },
                {
                  headers: {
                    'Authorization': `Bearer ${this.authStore.token}`
                  }
                }
              );
              // Actualizar el store de perfil con el nuevo proyecto
              this.profileStore.addProject(response.data);
            } catch (error) {
              console.error('Error al guardar el proyecto:', error);
            }
          }
        } catch (error) {
          console.error('Error al guardar los cambios:', error);
        } finally {
          // Recargar los proyectos actualizados
          this.loadProjects();
        }
      }
    }
  },
  watch: {
    // Observador para generar slug automáticamente al cambiar el título de un proyecto existente
    'form.projects': {
      deep: true,
      handler(newProjects) {
        newProjects.forEach(project => {
          if (project.title) {
            project.slug = this.generateSlug(project.title);
          }
        });
      }
    },
    // Observador para generar slug automáticamente al cambiar el título del nuevo proyecto
    'newProject.title'(newTitle) {
      if (newTitle) {
        this.newProject.slug = this.generateSlug(newTitle);
      }
    }
  }
};
</script>

<style scoped>
/* Contenedor del spinner de carga */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

/* Estilos base para la sección de edición */
.edit-section {
  padding: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--neutral-textos-900);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 1rem;
  color: var(--neutral-textos-700);
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 1px solid var(--neutral-textos-300);
  border-radius: 0.25rem;
  font-size: 1rem;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.file-upload {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.file-upload-btn {
  padding: 0.5rem 1rem;
  background-color: var(--botones-400);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.preview-image {
  max-width: 200px;
  border-radius: 0.25rem;
}

.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.social-media-input {
  display: flex;
  gap: 1rem;
  align-items: center;
}

select,
.social-media-input input {
  padding: 0.5rem;
  border: 1px solid var(--neutral-textos-300);
  border-radius: 0.25rem;
}

.add-btn,
.cancel-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.add-btn {
  background-color: var(--botones-400);
  color: white;
}

.cancel-btn {
  background-color: var(--neutral-textos-500);
  color: white;
}

.social-media-list {
  margin-top: 1rem;
}

.social-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--neutral-textos-200);
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.edit-btn {
  padding: 0.25rem 0.5rem;
  background-color: var(--botones-400);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.form-actions {
  margin-top: 1.5rem;
}

.submit-btn {
  padding: 0.75rem;
  background-color: var(--botones-400);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  width: fit-content;
}

.project-item {
  border: 1px solid var(--neutral-textos-200);
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.delete-btn {
  padding: 0.25rem 0.5rem;
  background-color: var(--neutral-textos-500);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.add-project {
  border: 1px dashed var(--neutral-textos-300);
  border-radius: 0.25rem;
  padding: 1rem;
}

/* Modo oscuro */
.edit-section.dark-mode {
  background-color: var(--primario-900);
  color: var(--neutral-textos-200);
}

.edit-section.dark-mode .section-title {
  color: var(--neutral-textos-200);
}

.edit-section.dark-mode .form-label {
  color: var(--neutral-textos-400);
}

.edit-section.dark-mode .form-input,
.edit-section.dark-mode .form-textarea {
  background-color: var(--primario-600);
  border-color: var(--neutral-textos-500);
  color: var(--neutral-textos-200);
}

.edit-section.dark-mode .error-message {
  color: var(--error-color-dark);
}

.edit-section.dark-mode .add-btn,
.edit-section.dark-mode .cancel-btn,
.edit-section.dark-mode .edit-btn,
.edit-section.dark-mode .submit-btn {
  background-color: var(--botones-300);
}

.edit-section.dark-mode .social-item {
  border-color: var(--neutral-textos-600);
}

.edit-section.dark-mode .project-item {
  border-color: var(--neutral-textos-600);
}

.edit-section.dark-mode .delete-btn {
  background-color: var(--neutral-textos-600);
}

.edit-section.dark-mode .add-project {
  border-color: var(--neutral-textos-600);
}

/* Adaptaciones para tablets */
@media (max-width: 1024px) {
  .edit-section {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .form-group {
    gap: 0.4rem;
  }

  .form-label {
    font-size: 0.9rem;
  }

  .form-input,
  .form-textarea {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  .add-btn,
  .cancel-btn,
  .edit-btn,
  .submit-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}

/* Adaptaciones para móviles */
@media (max-width: 768px) {
  .edit-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .form-group {
    gap: 0.3rem;
  }

  .form-label {
    font-size: 0.8rem;
  }

  .form-input,
  .form-textarea {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  .social-media-input {
    flex-direction: column;
  }

  select,
  .social-media-input input,
  .add-btn,
  .cancel-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .add-btn,
  .cancel-btn,
  .edit-btn,
  .submit-btn {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
}
</style>