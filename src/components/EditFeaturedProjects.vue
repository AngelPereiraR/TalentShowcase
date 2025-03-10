<template>
  <div class="edit-section">
    <h2 class="section-title">Editar Proyectos Destacados</h2>

    <form class="form">
      <div v-for="(project, index) in form.projects" :key="index" class="project-item">
        <div class="form-group">
          <label :for="'project-title-' + index" class="form-label">Título del proyecto</label>
          <input :id="'project-title-' + index" type="text" class="form-input" v-model="project.title" />
        </div>

        <div class="form-group">
          <label :for="'project-description-' + index" class="form-label">Descripción del proyecto</label>
          <textarea :id="'project-description-' + index" class="form-textarea" v-model="project.description"></textarea>
        </div>

        <div class="form-group">
          <label :for="'project-url-' + index" class="form-label">URL del proyecto</label>
          <input :id="'project-url-' + index" type="text" class="form-input" v-model="project.url" />
        </div>

        <button type="button" class="edit-btn" @click="editProject(index)">Editar</button>
      </div>

      <div class="add-project">
        <div class="form-group">
          <label for="new-project-title" class="form-label">Título del proyecto</label>
          <input type="text" id="new-project-title" class="form-input" v-model="newProject.title" />
        </div>

        <div class="form-group">
          <label for="new-project-description" class="form-label">Descripción del proyecto</label>
          <textarea id="new-project-description" class="form-textarea" v-model="newProject.description"></textarea>
        </div>

        <div class="form-group">
          <label for="new-project-url" class="form-label">URL del proyecto</label>
          <input type="text" id="new-project-url" class="form-input" v-model="newProject.url" />
        </div>

        <button type="button" class="add-btn" @click="addProject">Añadir</button>
      </div>

      <button type="submit" class="submit-btn">Guardar cambios</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditFeaturedProjects',
  data() {
    return {
      form: {
        projects: [
          {
            title: '',
            description: '',
            url: ''
          }
        ]
      },
      newProject: {
        title: '',
        description: '',
        url: ''
      }
    };
  },
  methods: {
    addProject() {
      if (this.newProject.title && this.newProject.description && this.newProject.url) {
        this.form.projects.push({ ...this.newProject });
        this.newProject = {
          title: '',
          description: '',
          url: ''
        };
      }
    },
    editProject(index) {
      // Implementar la lógica de edición
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