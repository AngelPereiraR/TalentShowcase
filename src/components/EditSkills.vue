<template>
  <div class="edit-section" :class="{ 'dark-mode': isDarkMode }">
    <h2 class="section-title">Editar Habilidades</h2>

    <form class="form" @submit.prevent="handleSubmit">
      <div v-if="isLoading" class="spinner-container">
        <Spinner />
      </div>
      <div v-for="(skill, index) in form.skills" :key="index" class="skill-item">
        <div class="form-group">
          <label :for="'skill-' + index" class="form-label">Habilidad</label>
          <input :id="'skill-' + index" type="text" class="form-input" v-model="skill.skill"
            @blur="validateSkill(index)" />
          <div v-if="errors[index]" class="error-message">{{ errors[index] }}</div>
        </div>

        <div class="skill-actions">
          <button type="button" class="delete-btn" @click="deleteSkill(index)">Eliminar</button>
        </div>
      </div>

      <div class="add-skill">
        <div class="form-group">
          <label for="new-skill" class="form-label">Habilidad</label>
          <input type="text" id="new-skill" class="form-input" v-model="newSkill.skill" @blur="validateNewSkill" />
          <div v-if="newErrors" class="error-message">{{ newErrors }}</div>
        </div>

        <button type="button" class="add-btn" @click="addSkill" :disabled="hasNewErrors">Añadir</button>
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
  skill: 'EditSkills',
  components: {
    Spinner
  },
  computed: {
    isDarkMode() {
      return useThemeStore().isDarkMode;
    },
    hasErrors() {
      return this.form.skills.some((skill, index) => {
        const skillErrors = this.errors[index];
        return skillErrors;
      });
    },
    hasNewErrors() {
      return this.newErrors !== null;
    }
  },
  data() {
    return {
      form: {
        skills: []
      },
      newSkill: {
        skill: ''
      },
      isLoading: false,
      profileStore: useProfileStore(),
      authStore: useAuthStore(),
      route: useRoute(),
      errors: [],
      newErrors: null,
      existingSkillIds: [] // Nuevo array para guardar los IDs de las habilidades existentes
    };
  },
  mounted() {
    this.loadSkills();
  },
  methods: {
    async loadSkills() {
      this.isLoading = true;
      try {
        const skillsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/skills/profile/${this.profileStore.profile.id}`, {
          headers: {
            'Authorization': `Bearer ${this.authStore.token}`
          }
        });
        const skillsData = skillsResponse.data;
        this.profileStore.setSkills(skillsData);
        this.form.skills = skillsData || [];

        // Guardar los IDs de las habilidades existentes
        this.existingSkillIds = skillsData.map(skill => skill.id);
      } catch (error) {
        console.error('Error al cargar las habilidades:', error);
      } finally {
        this.isLoading = false;
      }
    },
    validateSkill(index) {
      if (!this.form.skills[index].skill) {
        this.errors[index] = 'El campo Habilidad es obligatorio';
      } else {
        this.errors[index] = null;
      }
    },
    validateNewSkill() {
      if (!this.newSkill.skill) {
        this.newErrors = 'El campo Habilidad es obligatorio';
      } else {
        this.newErrors = null;
      }
    },
    addSkill() {
      this.validateNewSkill();

      if (!this.hasNewErrors) {
        this.form.skills.push({ ...this.newSkill });
        this.newSkill = {
          skill: ''
        };
        this.newErrors = null;
      }
    },
    deleteSkill(index) {
      this.form.skills.splice(index, 1);
      this.errors.splice(index, 1);
    },
    async handleSubmit() {
      console.log("HOla");
      // Validar todas las habilidades existentes
      this.form.skills.forEach((skill, index) => {
        this.validateSkill(index);
      });

      if (!this.hasErrors) {
        try {
          this.isLoading = true;
          // Eliminar todas las habilidades existentes
          if (this.existingSkillIds.length > 0) {
            for (const skillId of this.existingSkillIds) {
              try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/skills/${skillId}`, {
                  headers: {
                    'Authorization': `Bearer ${this.authStore.token}`
                  }
                });
              } catch (error) {
                console.error('Error al eliminar la habilidad:', error);
              }
            }
          }

          this.profileStore.setSkills([]);

          // Añadir las nuevas habilidades una por una
          for (const skill of this.form.skills) {
            try {
              const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/skills`, {
                profile_id: this.profileStore.profile.id,
                skill: skill.skill
              }, {
                headers: {
                  'Authorization': `Bearer ${this.authStore.token}`
                }
              });
              // Actualizar el profileStore con la nueva habilidad
              this.profileStore.addSkill(response.data);
            } catch (error) {
              console.error('Error al guardar la habilidad:', error);
            }
          }
        } catch (error) {
          console.error('Error al guardar los cambios:', error);
        } finally {
          this.loadSkills()
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

.skill-item {
  border: 1px solid var(--neutral-textos-200);
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.skill-actions {
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

.add-skill {
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

.edit-section.dark-mode .skill-item {
  border-color: var(--neutral-textos-600);
}

.edit-section.dark-mode .delete-btn {
  background-color: var(--neutral-textos-600);
}

.edit-section.dark-mode .add-skill {
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