<template>
  <div class="edit-section">
    <h2 class="section-title">Editar Educación</h2>

    <form class="form">
      <div v-for="(education, index) in form.education" :key="index" class="education-item">
        <div class="form-group">
          <label :for="'institution-' + index" class="form-label">Institución</label>
          <input :id="'institution-' + index" type="text" class="form-input" v-model="education.institution" />
        </div>

        <div class="form-group">
          <label :for="'degree-' + index" class="form-label">Grado</label>
          <input :id="'degree-' + index" type="text" class="form-input" v-model="education.degree" />
        </div>

        <div class="form-group">
          <label :for="'start-date-' + index" class="form-label">Fecha de Inicio</label>
          <input :id="'start-date-' + index" type="text" class="form-input" v-model="education.startDate" />
        </div>

        <div class="form-group">
          <label :for="'end-date-' + index" class="form-label">Fecha de Fin</label>
          <input :id="'end-date-' + index" type="text" class="form-input" v-model="education.endDate" />
        </div>

        <button type="button" class="edit-btn" @click="editEducation(index)">Editar</button>
      </div>

      <div class="add-education">
        <div class="form-group">
          <label for="new-institution" class="form-label">Institución</label>
          <input type="text" id="new-institution" class="form-input" v-model="newEducation.institution" />
        </div>

        <div class="form-group">
          <label for="new-degree" class="form-label">Grado</label>
          <input type="text" id="new-degree" class="form-input" v-model="newEducation.degree" />
        </div>

        <div class="form-group">
          <label for="new-start-date" class="form-label">Fecha de Inicio</label>
          <input type="text" id="new-start-date" class="form-input" v-model="newEducation.startDate" />
        </div>

        <div class="form-group">
          <label for="new-end-date" class="form-label">Fecha de Fin</label>
          <input type="text" id="new-end-date" class="form-input" v-model="newEducation.endDate" />
        </div>

        <button type="button" class="add-btn" @click="addEducation">Añadir</button>
      </div>

      <button type="submit" class="submit-btn">Guardar cambios</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditEducation',
  data() {
    return {
      form: {
        education: [
          {
            institution: '',
            degree: '',
            startDate: '',
            endDate: ''
          }
        ]
      },
      newEducation: {
        institution: '',
        degree: '',
        startDate: '',
        endDate: ''
      }
    };
  },
  methods: {
    addEducation() {
      if (this.newEducation.institution && this.newEducation.degree &&
        this.newEducation.startDate && this.newEducation.endDate) {
        this.form.education.push({ ...this.newEducation });
        this.newEducation = {
          institution: '',
          degree: '',
          startDate: '',
          endDate: ''
        };
      }
    },
    editEducation(index) {
      // Implementar la lógica de edición
    }
  }
};
</script>

<style scoped>
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
  align-items: center;
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

.file-name {
  color: var(--neutral-textos-500);
}

.file-input {
  display: none;
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

.add-btn {
  padding: 0.5rem 1rem;
  background-color: var(--botones-400);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
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

.submit-btn {
  padding: 0.75rem;
  background-color: var(--botones-400);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  width: fit-content;
}

/* Modo oscuro */
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

.edit-section.dark-mode .file-name {
  color: var(--neutral-textos-400);
}

.edit-section.dark-mode .file-upload-btn,
.edit-section.dark-mode .add-btn,
.edit-section.dark-mode .edit-btn,
.edit-section.dark-mode .submit-btn {
  background-color: var(--botones-300);
}

.edit-section.dark-mode .social-item {
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

  .add-btn,
  .edit-btn,
  .submit-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>