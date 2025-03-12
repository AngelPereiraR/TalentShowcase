<template>
  <div class="edit-section" :class="{ 'dark-mode': isDarkMode }">
    <h2 class="section-title">Editar Educación</h2>

    <form class="form" @submit.prevent="handleSubmit">
      <div v-if="isLoading" class="spinner-container">
        <Spinner />
      </div>
      <div v-for="(education, index) in form.education" :key="index" class="education-item">
        <div class="form-group">
          <label :for="'institution-' + index" class="form-label">Institución</label>
          <input :id="'institution-' + index" type="text" class="form-input" v-model="education.institution"
            @blur="validateInstitution(index)" />
          <div v-if="errors[index] && errors[index].institution" class="error-message">{{ errors[index].institution }}
          </div>
        </div>

        <div class="form-group">
          <label :for="'degree-' + index" class="form-label">Grado</label>
          <input :id="'degree-' + index" type="text" class="form-input" v-model="education.degree"
            @blur="validateDegree(index)" />
          <div v-if="errors[index] && errors[index].degree" class="error-message">{{ errors[index].degree }}</div>
        </div>

        <div class="form-group">
          <label :for="'start-date-' + index" class="form-label">Fecha de Inicio</label>
          <input :id="'start-date-' + index" type="date" class="form-input" v-model="education.start_date"
            @blur="validateStart_date(index)" />
          <div v-if="errors[index] && errors[index].start_date" class="error-message">{{ errors[index].start_date }}
          </div>
        </div>

        <div class="form-group">
          <label :for="'end-date-' + index" class="form-label">Fecha de Fin</label>
          <input :id="'end-date-' + index" type="date" class="form-input" v-model="education.end_date"
            @blur="validateEnd_date(index)" />
          <div v-if="errors[index] && errors[index].end_date" class="error-message">{{ errors[index].end_date }}</div>
        </div>

        <div class="education-actions">
          <button type="button" class="delete-btn" @click="deleteEducation(index)">Eliminar</button>
        </div>
      </div>

      <div class="add-education">
        <div class="form-group">
          <label for="new-institution" class="form-label">Institución</label>
          <input type="text" id="new-institution" class="form-input" v-model="newEducation.institution"
            @blur="validateNewInstitution" />
          <div v-if="newErrors.institution" class="error-message">{{ newErrors.institution }}</div>
        </div>

        <div class="form-group">
          <label for="new-degree" class="form-label">Grado</label>
          <input type="text" id="new-degree" class="form-input" v-model="newEducation.degree"
            @blur="validateNewDegree" />
          <div v-if="newErrors.degree" class="error-message">{{ newErrors.degree }}</div>
        </div>

        <div class="form-group">
          <label for="new-start-date" class="form-label">Fecha de Inicio</label>
          <input type="date" id="new-start-date" class="form-input" v-model="newEducation.start_date"
            @blur="validateNewStart_date" />
          <div v-if="newErrors.start_date" class="error-message">{{ newErrors.start_date }}</div>
        </div>

        <div class="form-group">
          <label for="new-end-date" class="form-label">Fecha de Fin</label>
          <input type="date" id="new-end-date" class="form-input" v-model="newEducation.end_date"
            @blur="validateNewEnd_date" />
          <div v-if="newErrors.end_date" class="error-message">{{ newErrors.end_date }}</div>
        </div>

        <button type="button" class="add-btn" @click="addEducation" :disabled="hasNewErrors">Añadir</button>
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
  name: 'EditEducation',
  components: {
    Spinner
  },
  computed: {
    isDarkMode() {
      return useThemeStore().isDarkMode;
    },
    hasErrors() {
      return this.form.education.some((edu, index) => {
        const educationErrors = this.errors[index];
        return educationErrors && (educationErrors.institution || educationErrors.degree || educationErrors.start_date || educationErrors.end_date);
      });
    },
    hasNewErrors() {
      return this.newErrors.institution || this.newErrors.degree || this.newErrors.start_date || this.newErrors.end_date;
    }
  },
  data() {
    return {
      form: {
        education: []
      },
      newEducation: {
        institution: '',
        degree: '',
        start_date: '',
        end_date: ''
      },
      isLoading: false,
      profileStore: useProfileStore(),
      authStore: useAuthStore(),
      route: useRoute(),
      errors: [],
      newErrors: {
        institution: null,
        degree: null,
        start_date: null,
        end_date: null
      },
      existingEducationIds: [] // Nuevo array para guardar los IDs de las educaciones existentes
    };
  },
  mounted() {
    this.loadEducation();
  },
  methods: {
    async loadEducation() {
      this.isLoading = true;
      try {
        const educationResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/education/profile/${this.profileStore.profile.id}`, {
          headers: {
            'Authorization': `Bearer ${this.authStore.token}`
          }
        });
        const educationData = educationResponse.data;
        this.profileStore.setEducation(educationData);
        this.form.education = educationData || [];

        // Guardar los IDs de las educaciones existentes
        this.existingEducationIds = educationData.map(edu => edu.id);
      } catch (error) {
        console.error('Error al cargar la educación:', error);
      } finally {
        this.isLoading = false;
      }
    },
    validateInstitution(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.education[index].institution) {
        this.errors[index].institution = 'El campo Institución es obligatorio'
      } else {
        this.errors[index].institution = null
      }
    },
    validateDegree(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.education[index].degree) {
        this.errors[index].degree = 'El campo Grado es obligatorio'
      } else {
        this.errors[index].degree = null
      }
    },
    validateStart_date(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.education[index].start_date) {
        this.errors[index].start_date = 'El campo Fecha de Inicio es obligatorio'
      } else {
        this.errors[index].start_date = null
      }
    },
    validateEnd_date(index) {
      if (!this.errors[index])
        this.errors[index] = {}
      if (!this.form.education[index].end_date) {
        this.errors[index].end_date = 'El campo Fecha de Fin es obligatorio'
      } else {
        this.errors[index].end_date = null
      }
    },
    validateNewInstitution() {
      if (!this.newEducation.institution) {
        this.newErrors.institution = 'El campo Institución es obligatorio';
      } else {
        this.newErrors.institution = null;
      }
    },
    validateNewDegree() {
      if (!this.newEducation.degree) {
        this.newErrors.degree = 'El campo Grado es obligatorio';
      } else {
        this.newErrors.degree = null;
      }
    },
    validateNewStart_date() {
      if (!this.newEducation.start_date) {
        this.newErrors.start_date = 'El campo Fecha de Inicio es obligatorio';
      } else {
        this.newErrors.start_date = null;
      }
    },
    validateNewEnd_date() {
      if (!this.newEducation.end_date) {
        this.newErrors.end_date = 'El campo Fecha de Fin es obligatorio';
      } else {
        this.newErrors.end_date = null;
      }
    },
    addEducation() {
      this.validateNewInstitution();
      this.validateNewDegree();
      this.validateNewStart_date();
      this.validateNewEnd_date();

      if (!this.hasNewErrors) {
        this.form.education.push({ ...this.newEducation });
        this.newEducation = {
          institution: '',
          degree: '',
          start_date: '',
          end_date: ''
        };
        this.newErrors = {
          institution: null,
          degree: null,
          start_date: null,
          end_date: null
        };
      }
    },
    deleteEducation(index) {
      this.form.education.splice(index, 1);
      this.errors.splice(index, 1);
    },
    async handleSubmit() {
      // Validar todas las educaciones existentes
      this.form.education.forEach((edu, index) => {
        this.validateInstitution(index);
        this.validateDegree(index);
        this.validateStart_date(index);
        this.validateEnd_date(index);
      });

      if (!this.hasErrors) {
        try {
          this.isLoading = true;
          // Eliminar todas las educaciones existentes
          if (this.existingEducationIds.length > 0) {
            for (const educationId of this.existingEducationIds) {
              try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/education/${educationId}`, {
                  headers: {
                    'Authorization': `Bearer ${this.authStore.token}`
                  }
                });
              } catch (error) {
                console.error('Error al eliminar la educación:', error);
              }
            }
          }

          this.profileStore.setEducation([]);

          // Añadir las nuevas educaciones una por una
          for (const education of this.form.education) {
            try {
              const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/education`, {
                profile_id: this.profileStore.profile.id,
                institution: education.institution,
                degree: education.degree,
                start_date: education.start_date,
                end_date: education.end_date
              }, {
                headers: {
                  'Authorization': `Bearer ${this.authStore.token}`
                }
              });
              // Actualizar el profileStore con la nueva educación
              this.profileStore.addEducation(response.data);
            } catch (error) {
              console.error('Error al guardar la educación:', error);
            }
          }
        } catch (error) {
          console.error('Error al guardar los cambios:', error);
        } finally {
          this.loadEducation()
        }
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

.education-item {
  border: 1px solid var(--neutral-textos-200);
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.education-actions {
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

.add-education {
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

.edit-section.dark-mode .education-item {
  border-color: var(--neutral-textos-600);
}

.edit-section.dark-mode .delete-btn {
  background-color: var(--neutral-textos-600);
}

.edit-section.dark-mode .add-education {
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