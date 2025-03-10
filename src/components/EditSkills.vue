<template>
  <div class="edit-section">
    <h2 class="section-title">Editar Habilidades</h2>

    <form class="form">
      <div v-for="(skill, index) in form.skills" :key="index" class="skill-item">
        <div class="form-group">
          <label :for="'skill-' + index" class="form-label">Habilidad</label>
          <input :id="'skill-' + index" type="text" class="form-input" v-model="skill.name" />
        </div>

        <button type="button" class="edit-btn" @click="editSkill(index)">Editar</button>
      </div>

      <div class="add-skill">
        <div class="form-group">
          <label for="new-skill" class="form-label">Habilidad</label>
          <input type="text" id="new-skill" class="form-input" v-model="newSkill.name" />
        </div>

        <button type="button" class="add-btn" @click="addSkill">Añadir</button>
      </div>

      <button type="submit" class="submit-btn">Guardar cambios</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditSkills',
  data() {
    return {
      form: {
        skills: [
          {
            name: ''
          }
        ]
      },
      newSkill: {
        name: ''
      }
    };
  },
  methods: {
    addSkill() {
      if (this.newSkill.name) {
        this.form.skills.push({ ...this.newSkill });
        this.newSkill = {
          name: ''
        };
      }
    },
    editSkill(index) {
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