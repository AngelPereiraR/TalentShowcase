<template>
  <div class="edit-section" :class="{ 'dark-mode': isDarkMode }">
    <h2 class="section-title">Editar Proyectos Destacados</h2>

    <form class="form" @submit.prevent="handleSubmit">
      <div v-if="isLoading" class="spinner-container">
        <Spinner />
      </div>
      <div v-for="(project, index) in form.projects" :key="index" class="project-item">
        <div class="form-group">
          <label :for="'project-title-' + index" class="form-label">Título del proyecto</label>
          <input :id="'project-title-' + index" type="text" class="form-input" v-model="project.title"
            @blur="validateTitle(index)" />
          <div v-if="errors[index] && errors[index].title" class="error-message">{{ errors[index].title }}</div>
        </div>

        <div class="form-group">
          <label :for="'project-description-' + index" class="form-label">Descripción del proyecto</label>
          <textarea :id="'project-description-' + index" class="form-textarea" v-model="project.description"
            @blur="validateDescription(index)"></textarea>
          <div v-if="errors[index] && errors[index].description" class="error-message">{{ errors[index].description }}
          </div>
        </div>

        <div class="form-group">
          <label :for="'project-url-' + index" class="form-label">URL del proyecto</label>
          <input :id="'project-url-' + index" type="text" class="form-input" v-model="project.url"
            @blur="validateUrl(index)" />
          <div v-if="errors[index] && errors[index].url" class="error-message">{{ errors[index].url }}</div>
        </div>

        <div class="form-group">
          <label :for="'project-start-date-' + index" class="form-label">Fecha de inicio</label>
          <input :id="'project-start-date-' + index" type="date" class="form-input" v-model="project.start_date"
            @blur="validateStartDate(index)" />
          <div v-if="errors[index] && errors[index].start_date" class="error-message">{{ errors[index].start_date }}
          </div>
        </div>

        <div class="form-group">
          <label :for="'project-end-date-' + index" class="form-label">Fecha de fin</label>
          <input :id="'project-end-date-' + index" type="date" class="form-input" v-model="project.end_date"
            @blur="validateEndDate(index)" />
          <div v-if="errors[index] && errors[index].end_date" class="error-message">{{ errors[index].end_date }}</div>
        </div>

        <div class="project-actions">
          <button type="button" class="delete-btn" @click="deleteProject(index)">Eliminar</button>
        </div>
      </div>

      <div class="add-project">
        <div class="form-group">
          <label for="new-project-title" class="form-label">Título del proyecto</label>
          <input type="text" id="new-project-title" class="form-input" v-model="newProject.title"
            @blur="validateNewTitle" />
          <div v-if="newErrors.title" class="error-message">{{ newErrors.title }}</div>
        </div>

        <div class="form-group">
          <label for="new-project-description" class="form-label">Descripción del proyecto</label>
          <textarea id="new-project-description" class="form-textarea" v-model="newProject.description"
            @blur="validateNewDescription"></textarea>
          <div v-if="newErrors.description" class="error-message">{{ newErrors.description }}</div>
        </div>

        <div class="form-group">
          <label for="new-project-url" class="form-label">URL del proyecto</label>
          <input type="text" id="new-project-url" class="form-input" v-model="newProject.url" @blur="validateNewUrl" />
          <div v-if="newErrors.url" class="error-message">{{ newErrors.url }}</div>
        </div>

        <div class="form-group">
          <label for="new-project-start-date" class="form-label">Fecha de inicio</label>
          <input type="date" id="new-project-start-date" class="form-input" v-model="newProject.start_date"
            @blur="validateNewStartDate" />
          <div v-if="newErrors.start_date" class="error-message">{{ newErrors.start_date }}</div>
        </div>

        <div class="form-group">
          <label for="new-project-end-date" class="form-label">Fecha de fin</label>
          <input type="date" id="new-project-end-date" class="form-input" v-model="newProject.end_date"
            @blur="validateNewEndDate" />
          <div v-if="newErrors.end_date" class="error-message">{{ newErrors.end_date }}</div>
        </div>

        <button type="button" class="add-btn" @click="addProject" :disabled="hasNewErrors">Añadir</button>
      </div>

      <button type="submit" class="submit-btn" :disabled="hasErrors">Guardar cambios</button>
    </form>
  </div>
</template>

<script>
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
    isDarkMode() {
      return useThemeStore().isDarkMode;
    },
    hasErrors() {
      return this.form.projects.some((project, index) => {
        const projectErrors = this.errors[index];
        return projectErrors && (projectErrors.title || projectErrors.description || projectErrors.url || projectErrors.start_date || projectErrors.end_date);
      });
    },
    hasNewErrors() {
      return this.newErrors.title || this.newErrors.description || this.newErrors.url || this.newErrors.start_date || this.newErrors.end_date;
    }
  },
  data() {
    return {
      form: {
        projects: []
      },
      newProject: {
        title: '',
        description: '',
        url: '',
        start_date: '',
        end_date: '',
        slug: ''
      },
      isLoading: false,
      profileStore: useProfileStore(),
      authStore: useAuthStore(),
      route: useRoute(),
      errors: [],
      newErrors: {
        title: null,
        description: null,
        url: null,
        start_date: null,
        end_date: null
      },
      existingProjectIds: [] // Nuevo array para guardar los IDs de los proyectos existentes
    };
  },
  mounted() {
    this.loadProjects();
  },
  methods: {
    async loadProjects() {
      this.isLoading = true;
      try {
        const projectsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/projects/profile/${this.profileStore.profile.id}`, {
          headers: {
            'Authorization': `Bearer ${this.authStore.token}`
          }
        });
        const projectsData = projectsResponse.data;
        this.profileStore.setProjects(projectsData);
        this.form.projects = projectsData || [];

        // Guardar los IDs de los proyectos existentes
        this.existingProjectIds = projectsData.map(project => project.id);
      } catch (error) {
        console.error('Error al cargar los proyectos:', error);
      } finally {
        this.isLoading = false;
      }
    },
    validateTitle(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].title) {
        this.errors[index].title = 'El campo Título del proyecto es obligatorio'
      } else {
        this.errors[index].title = null
      }
    },
    validateDescription(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].description) {
        this.errors[index].description = 'El campo Descripción del proyecto es obligatorio'
      } else {
        this.errors[index].description = null
      }
    },
    validateUrl(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].url) {
        this.errors[index].url = 'El campo URL del proyecto es obligatorio'
      } else {
        this.errors[index].url = null
      }
    },
    validateStartDate(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].start_date) {
        this.errors[index].start_date = 'El campo Fecha de inicio es obligatorio'
      } else {
        this.errors[index].start_date = null
      }
    },
    validateEndDate(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.projects[index].end_date) {
        this.errors[index].end_date = 'El campo Fecha de fin es obligatorio'
      } else {
        this.errors[index].end_date = null
      }
    },
    validateNewTitle() {
      if (!this.newProject.title) {
        this.newErrors.title = 'El campo Título del proyecto es obligatorio';
      } else {
        this.newErrors.title = null;
      }
    },
    validateNewDescription() {
      if (!this.newProject.description) {
        this.newErrors.description = 'El campo Descripción del proyecto es obligatorio';
      } else {
        this.newErrors.description = null;
      }
    },
    validateNewUrl() {
      if (!this.newProject.url) {
        this.newErrors.url = 'El campo URL del proyecto es obligatorio';
      } else {
        this.newErrors.url = null;
      }
    },
    validateNewStartDate() {
      if (!this.newProject.start_date) {
        this.newErrors.start_date = 'El campo Fecha de inicio es obligatorio';
      } else {
        this.newErrors.start_date = null;
      }
    },
    validateNewEndDate() {
      if (!this.newProject.end_date) {
        this.newErrors.end_date = 'El campo Fecha de fin es obligatorio';
      } else {
        this.newErrors.end_date = null;
      }
    },
    addProject() {
      this.validateNewTitle();
      this.validateNewDescription();
      this.validateNewUrl();
      this.validateNewStartDate();
      this.validateNewEndDate();

      if (!this.hasNewErrors) {
        // Generar slug para el nuevo proyecto
        this.newProject.slug = this.generateSlug(this.newProject.title);

        this.form.projects.push({ ...this.newProject });
        this.newProject = {
          title: '',
          description: '',
          url: '',
          start_date: '',
          end_date: '',
          slug: ''
        };
        this.newErrors = {
          title: null,
          description: null,
          url: null,
          start_date: null,
          end_date: null
        };
      }
    },
    deleteProject(index) {
      this.form.projects.splice(index, 1);
      this.errors.splice(index, 1);
    },
    generateSlug(title) {
      return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    },
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
          // Eliminar todos los proyectos existentes
          if (this.existingProjectIds.length > 0) {
            for (const projectId of this.existingProjectIds) {
              try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/projects/${projectId}`, {
                  headers: {
                    'Authorization': `Bearer ${this.authStore.token}`
                  }
                });
              } catch (error) {
                console.error('Error al eliminar el proyecto:', error);
              }
            }
          }

          this.profileStore.setProjects([]);

          // Añadir los nuevos proyectos uno por uno
          for (const project of this.form.projects) {
            try {
              const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/projects`, {
                profile_id: this.profileStore.profile.id,
                title: project.title,
                description: project.description,
                url: project.url,
                start_date: project.start_date,
                end_date: project.end_date,
                slug: project.slug
              }, {
                headers: {
                  'Authorization': `Bearer ${this.authStore.token}`
                }
              });
              // Actualizar el profileStore con el nuevo proyecto
              this.profileStore.addProject(response.data);
            } catch (error) {
              console.error('Error al guardar el proyecto:', error);
            }
          }
        } catch (error) {
          console.error('Error al guardar los cambios:', error);
        } finally {
          this.loadProjects()
        }
      }
    }
  },
  watch: {
    // Watch para proyectos existentes
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
    // Watch para el nuevo proyecto
    'newProject.title'(newTitle) {
      if (newTitle) {
        this.newProject.slug = this.generateSlug(newTitle);
      }
    }
  }
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

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

/* Media Queries para tablets */
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

/* Media Queries para móviles */
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