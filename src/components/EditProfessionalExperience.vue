<template>
  <div class="edit-section" :class="{ 'dark-mode': isDarkMode }">
    <h2 class="section-title">Editar Experiencia Profesional</h2>

    <form class="form" @submit.prevent="handleSubmit">
      <div v-if="isLoading" class="spinner-container">
        <Spinner />
      </div>
      <div v-for="(experience, index) in form.experiences" :key="index" class="experience-item">
        <div class="form-group">
          <label :for="'company-' + index" class="form-label">Empresa</label>
          <input :id="'company-' + index" type="text" class="form-input" v-model="experience.company"
            @blur="validateCompany(index)" />
          <div v-if="errors[index] && errors[index].company" class="error-message">{{ errors[index].company }}</div>
        </div>

        <div class="form-group">
          <label :for="'position-' + index" class="form-label">Puesto</label>
          <input :id="'position-' + index" type="text" class="form-input" v-model="experience.position"
            @blur="validatePosition(index)" />
          <div v-if="errors[index] && errors[index].position" class="error-message">{{ errors[index].position }}</div>
        </div>

        <div class="form-group">
          <label :for="'start-date-' + index" class="form-label">Fecha de Inicio</label>
          <input :id="'start-date-' + index" type="date" class="form-input" v-model="experience.start_date"
            @blur="validateStartDate(index)" />
          <div v-if="errors[index] && errors[index].start_date" class="error-message">{{ errors[index].start_date }}
          </div>
        </div>

        <div class="form-group">
          <label :for="'end-date-' + index" class="form-label">Fecha de Fin</label>
          <input :id="'end-date-' + index" type="date" class="form-input" v-model="experience.end_date"
            @blur="validateEndDate(index)" />
          <div v-if="errors[index] && errors[index].end_date" class="error-message">{{ errors[index].end_date }}</div>
        </div>

        <div class="experience-actions">
          <button type="button" class="delete-btn" @click="deleteExperience(index)">Eliminar</button>
        </div>
      </div>

      <div class="add-experience">
        <div class="form-group">
          <label for="new-company" class="form-label">Empresa</label>
          <input type="text" id="new-company" class="form-input" v-model="newExperience.company"
            @blur="validateNewCompany" />
          <div v-if="newErrors.company" class="error-message">{{ newErrors.company }}</div>
        </div>

        <div class="form-group">
          <label for="new-position" class="form-label">Puesto</label>
          <input type="text" id="new-position" class="form-input" v-model="newExperience.position"
            @blur="validateNewPosition" />
          <div v-if="newErrors.position" class="error-message">{{ newErrors.position }}</div>
        </div>

        <div class="form-group">
          <label for="new-start-date" class="form-label">Fecha de Inicio</label>
          <input type="date" id="new-start-date" class="form-input" v-model="newExperience.start_date"
            @blur="validateNewStartDate" />
          <div v-if="newErrors.start_date" class="error-message">{{ newErrors.start_date }}</div>
        </div>

        <div class="form-group">
          <label for="new-end-date" class="form-label">Fecha de Fin</label>
          <input type="date" id="new-end-date" class="form-input" v-model="newExperience.end_date"
            @blur="validateNewEndDate" />
          <div v-if="newErrors.end_date" class="error-message">{{ newErrors.end_date }}</div>
        </div>

        <button type="button" class="add-btn" @click="addExperience" :disabled="hasNewErrors">Añadir</button>
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
import { watch } from 'vue';

export default {
  name: 'EditProfessionalExperience',
  components: {
    Spinner
  },
  computed: {
    isDarkMode() {
      return useThemeStore().isDarkMode;
    },
    hasErrors() {
      return this.form.experiences.some((exp, index) => {
        const experienceErrors = this.errors[index];
        return experienceErrors && (experienceErrors.company || experienceErrors.position || experienceErrors.start_date || experienceErrors.end_date);
      });
    },
    hasNewErrors() {
      return this.newErrors.company || this.newErrors.position || this.newErrors.start_date || this.newErrors.end_date;
    }
  },
  data() {
    return {
      form: {
        experiences: []
      },
      newExperience: {
        company: '',
        position: '',
        start_date: '',
        end_date: ''
      },
      isLoading: false,
      profileStore: useProfileStore(),
      authStore: useAuthStore(),
      route: useRoute(),
      errors: [],
      newErrors: {
        company: null,
        position: null,
        start_date: null,
        end_date: null
      },
      existingExperienceIds: [] // Nuevo array para guardar los IDs de las experiencias existentes
    };
  },
  mounted() {
    this.loadExperiences();
  },
  methods: {
    async loadExperiences() {
      this.isLoading = true;
      try {
        const professionalExperienceResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/professional-experience/profile/${this.profileStore.profile.id}`, {
          headers: {
            'Authorization': `Bearer ${this.authStore.token}`
          }
        });
        const professionalExperienceData = professionalExperienceResponse.data;
        this.profileStore.setProfessionalExperience(professionalExperienceData);
        this.form.experiences = professionalExperienceData || [];

        // Guardar los IDs de las experiencias existentes
        this.existingExperienceIds = professionalExperienceData.map(exp => exp.id);
      } catch (error) {
        console.error('Error al cargar las experiencias:', error);
      } finally {
        this.isLoading = false;
      }
    },
    validateCompany(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.experiences[index].company) {
        this.errors[index].company = 'El campo Empresa es obligatorio'
      } else {
        this.errors[index].company = null
      }
    },
    validatePosition(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.experiences[index].position) {
        this.errors[index].position = 'El campo Puesto es obligatorio'
      } else {
        this.errors[index].position = null
      }
    },
    validateStartDate(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.experiences[index].start_date) {
        this.errors[index].start_date = 'El campo Fecha de Inicio es obligatorio'
      } else {
        this.errors[index].start_date = null
      }
    },
    validateEndDate(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.experiences[index].end_date) {
        this.errors[index].end_date = 'El campo Fecha de Fin es obligatorio'
      } else {
        this.errors[index].end_date = null
      }
    },
    validateNewCompany() {
      if (!this.newExperience.company) {
        this.newErrors.company = 'El campo Empresa es obligatorio';
      } else {
        this.newErrors.company = null;
      }
    },
    validateNewPosition() {
      if (!this.newExperience.position) {
        this.newErrors.position = 'El campo Puesto es obligatorio';
      } else {
        this.newErrors.position = null;
      }
    },
    validateNewStartDate() {
      if (!this.newExperience.start_date) {
        this.newErrors.start_date = 'El campo Fecha de Inicio es obligatorio';
      } else {
        this.newErrors.start_date = null;
      }
    },
    validateNewEndDate() {
      if (!this.newExperience.end_date) {
        this.newErrors.end_date = 'El campo Fecha de Fin es obligatorio';
      } else {
        this.newErrors.end_date = null;
      }
    },
    addExperience() {
      this.validateNewCompany();
      this.validateNewPosition();
      this.validateNewStartDate();
      this.validateNewEndDate();

      if (!this.hasNewErrors) {
        this.form.experiences.push({ ...this.newExperience });
        this.newExperience = {
          company: '',
          position: '',
          start_date: '',
          end_date: ''
        };
        this.newErrors = {
          company: null,
          position: null,
          start_date: null,
          end_date: null
        };
      }
    },
    deleteExperience(index) {
      this.form.experiences.splice(index, 1);
      this.errors.splice(index, 1);
    },
    generateSlug() {
      return this.form.fullname
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    },
    async handleSubmit() {
      // Validar todas las experiencias existentes
      this.form.experiences.forEach((exp, index) => {
        this.validateCompany(index);
        this.validatePosition(index);
        this.validateStartDate(index);
        this.validateEndDate(index);
      });

      if (!this.hasErrors) {
        try {
          this.isLoading = true;
          // Eliminar todas las experiencias existentes
          if (this.existingExperienceIds.length > 0) {
            for (const experienceId of this.existingExperienceIds) {
              try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/professional-experience/${experienceId}`, {
                  headers: {
                    'Authorization': `Bearer ${this.authStore.token}`
                  }
                });
              } catch (error) {
                console.error('Error al eliminar la experiencia:', error);
              }
            }
          }

          this.profileStore.setProfessionalExperience([]);

          // Añadir las nuevas experiencias una por una
          for (const experience of this.form.experiences) {
            try {
              const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/professional-experience`, {
                profile_id: this.profileStore.profile.id,
                company: experience.company,
                position: experience.position,
                start_date: experience.start_date,
                end_date: experience.end_date
              }, {
                headers: {
                  'Authorization': `Bearer ${this.authStore.token}`
                }
              });
              // Actualizar el profileStore con la nueva experiencia
              this.profileStore.addProfessionalExperience(response.data);
            } catch (error) {
              console.error('Error al guardar la experiencia:', error);
            }
          }
        } catch (error) {
          console.error('Error al guardar los cambios:', error);
        } finally {
          this.loadExperiences()
        }
      }
    },
    watch
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

.experience-item {
  border: 1px solid var(--neutral-textos-200);
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.experience-actions {
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

.add-experience {
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

.edit-section.dark-mode .experience-item {
  border-color: var(--neutral-textos-600);
}

.edit-section.dark-mode .delete-btn {
  background-color: var(--neutral-textos-600);
}

.edit-section.dark-mode .add-experience {
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