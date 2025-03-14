<template>
  <!-- Contenedor principal de la sección de edición de información personal -->
  <div class="edit-section" :class="{ 'dark-mode': isDarkMode }">
    <!-- Título de la sección -->
    <h2 class="section-title">Editar Información Personal</h2>

    <!-- Formulario para editar información personal -->
    <form class="form" @submit.prevent="handleSubmit">
      <!-- Spinner de carga mientras se procesan los datos -->
      <div v-if="isLoading" class="spinner-container">
        <Spinner />
      </div>

      <!-- Campos del formulario -->
      <div v-else>
        <!-- Campo de Nombre Completo -->
        <div class="form-group">
          <label for="fullname" class="form-label">Nombre Completo</label>
          <input type="text" id="fullname" class="form-input" v-model="form.fullname" @blur="validateFullname" />
          <!-- Mensajes de error para el nombre completo -->
          <div v-if="errors.fullname" class="error-message">{{ errors.fullname }}</div>
          <div v-if="errors.slug" class="error-message">{{ errors.slug }}</div>
        </div>

        <!-- Campo de Título Profesional -->
        <div class="form-group">
          <label for="title" class="form-label">Título Profesional</label>
          <input type="text" id="title" class="form-input" v-model="form.title" @blur="validateTitle" />
          <!-- Mensaje de error para el título -->
          <div v-if="errors.title" class="error-message">{{ errors.title }}</div>
        </div>

        <!-- Campo de Descripción -->
        <div class="form-group">
          <label for="description" class="form-label">Descripción</label>
          <textarea id="description" class="form-textarea" v-model="form.description"
            @blur="validateDescription"></textarea>
          <!-- Mensaje de error para la descripción -->
          <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
        </div>

        <!-- Campo de Foto de Perfil -->
        <div class="form-group">
          <label for="profile-photo" class="form-label">Foto de Perfil</label>
          <div class="file-upload">
            <!-- Vista previa de la imagen -->
            <img v-if="fileName" :src="fileName" :alt="form.fullname" class="preview-image" />
            <!-- Selector de archivo -->
            <input type="file" id="profile-photo" class="file-upload-btn" @change="handleFileUpload" accept="image/*" />
          </div>
          <!-- Mensaje de error para el archivo -->
          <div v-if="fileError" class="error-message">{{ fileError }}</div>
        </div>

        <!-- Campo de Redes Sociales -->
        <div class="form-group">
          <label for="social-media" class="form-label">Redes Sociales</label>
          <div class="social-media-input">
            <!-- Selector de red social y URL -->
            <select id="social-media-select" v-model="form.socialMedia.platform">
              <option value="">Selecciona una red social</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
            <input type="text" v-model="form.socialMedia.url" placeholder="Url de la red social" />
            <!-- Botones para añadir o modificar redes sociales -->
            <button class="add-btn" @click.prevent="addSocialMedia">
              {{ isEditingSocialMedia ? 'Modificar' : 'Añadir' }}
            </button>
            <button v-if="isEditingSocialMedia" class="cancel-btn" @click.prevent="cancelEditSocialMedia">
              Cancelar
            </button>
          </div>
          <!-- Lista de redes sociales existentes -->
          <div class="social-media-list">
            <div v-for="(social, index) in form.socialMediaList" :key="index" class="social-item">
              <span>{{ social.platform }}: {{ social.url }}</span>
              <button class="edit-btn" @click.prevent="editSocialMedia(index)">Editar</button>
            </div>
          </div>
        </div>

        <!-- Botón para guardar cambios -->
        <div class="form-actions">
          <button type="submit" class="submit-btn">Guardar cambios</button>
        </div>
      </div>
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
  name: 'EditPersonalInfo',
  components: {
    Spinner
  },
  computed: {
    // Propiedad computada para determinar si está activado el modo oscuro
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  },
  data() {
    return {
      // Formulario con los datos del perfil
      form: {
        fullname: '',
        title: '',
        description: '',
        socialMedia: {
          platform: '',
          url: ''
        },
        socialMediaList: [],
        photo: null
      },
      // Estado de carga y errores
      fileName: 'Ningún archivo seleccionado',
      fileError: '',
      isEditingSocialMedia: false,
      editingSocialMediaIndex: -1,
      originalSocialMedia: null,
      slug: '',
      isLoading: false,
      // Referencias a stores y rutas
      profileStore: useProfileStore(),
      authStore: useAuthStore(),
      route: useRoute(),
      // Errores de validación
      errors: {
        fullname: null,
        title: null,
        description: null,
        slug: null
      }
    };
  },
  mounted() {
    // Cargar los datos del perfil al montar el componente
    this.loadProfileData();
  },
  methods: {
    // Método para cargar los datos del perfil desde la API
    async loadProfileData() {
      this.isLoading = true;
      try {
        // Obtener los datos del perfil
        const profileResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/profiles/user/${this.route.params.id}`,
          {
            headers: {
              'Authorization': `Bearer ${this.authStore.token}`
            }
          }
        );
        const profileData = profileResponse.data;
        this.profileStore.setProfile(profileData);

        // Obtener las redes sociales del perfil
        const socialResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/social-networks/profile/${this.profileStore.profile.id}`,
          {
            headers: {
              'Authorization': `Bearer ${this.authStore.token}`
            }
          }
        );
        const socialData = socialResponse.data;
        this.profileStore.setSocialNetworks(socialData);
      } catch (error) {
        // Manejo de errores
        console.error('Error al cargar los datos:', error);
        this.profileStore.setProfile(null);
        this.profileStore.setSocialNetworks(null);
      } finally {
        // Cambiar el estado de carga
        this.isLoading = false;
      }
    },
    // Método para manejar la subida de archivos de imagen
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.fileError = '';

      if (file) {
        // Validar que el archivo sea una imagen
        if (!file.type.startsWith('image/')) {
          this.fileError = 'Por favor selecciona un archivo de imagen';
          this.fileName = 'Ningún archivo seleccionado';
          return;
        }
        // Mostrar vista previa de la imagen
        this.fileName = URL.createObjectURL(file);
        this.form.photo = file;
      } else {
        // Resetear el campo de archivo
        this.fileName = 'Ningún archivo seleccionado';
        this.form.photo = null;
      }
    },
    // Validación del campo Nombre Completo
    validateFullname() {
      if (!this.form.fullname) {
        this.errors.fullname = 'El nombre completo es obligatorio';
        this.errors.slug = null;
      } else {
        this.errors.fullname = null;
        this.errors.slug = null;
      }
    },
    // Validación del campo Título Profesional
    validateTitle() {
      if (!this.form.title) {
        this.errors.title = 'El título profesional es obligatorio';
      } else {
        this.errors.title = null;
      }
    },
    // Validación del campo Descripción
    validateDescription() {
      if (!this.form.description) {
        this.errors.description = 'La descripción es obligatoria';
      } else {
        this.errors.description = null;
      }
    },
    // Método para añadir o modificar redes sociales
    addSocialMedia() {
      if (this.isEditingSocialMedia && this.editingSocialMediaIndex !== -1) {
        // Si se está editando, actualizar la red social existente
        this.form.socialMediaList[this.editingSocialMediaIndex] = {
          platform: this.form.socialMedia.platform,
          url: this.form.socialMedia.url
        };
        this.isEditingSocialMedia = false;
        this.editingSocialMediaIndex = -1;
        this.form.socialMedia.platform = '';
        this.form.socialMedia.url = '';
      } else {
        // Si no se está editando, añadir una nueva red social
        if (this.form.socialMedia.platform && this.form.socialMedia.url) {
          this.form.socialMediaList.push({
            platform: this.form.socialMedia.platform,
            url: this.form.socialMedia.url
          });
          this.form.socialMedia.platform = '';
          this.form.socialMedia.url = '';
        }
      }
    },
    // Método para editar una red social existente
    editSocialMedia(index) {
      const social = this.form.socialMediaList[index];
      this.originalSocialMedia = { ...social };
      this.form.socialMedia.platform = social.platform;
      this.form.socialMedia.url = social.url;
      this.isEditingSocialMedia = true;
      this.editingSocialMediaIndex = index;
    },
    // Método para cancelar la edición de una red social
    cancelEditSocialMedia() {
      if (this.originalSocialMedia) {
        this.form.socialMedia.platform = this.originalSocialMedia.platform;
        this.form.socialMedia.url = this.originalSocialMedia.url;
      } else {
        this.form.socialMedia.platform = '';
        this.form.socialMedia.url = '';
      }
      this.isEditingSocialMedia = false;
      this.editingSocialMediaIndex = -1;
      this.originalSocialMedia = null;
    },
    // Método para enviar el formulario y guardar los cambios
    async handleSubmit(event) {
      // Validar todos los campos
      this.validateFullname();
      this.validateTitle();
      this.validateDescription();

      // Si hay errores, no procesar el envío
      if (
        this.errors.fullname ||
        this.errors.title ||
        this.errors.description ||
        this.errors.slug
      ) {
        return;
      }

      try {
        this.isLoading = true;
        const profileId = this.profileStore.profile?.id;
        const socialNetworks = this.profileStore.socialNetworks;

        // Preparar los datos del perfil para enviar
        const profileData = new FormData();
        profileData.append('user_id', this.route.params.id);
        profileData.append('full_name', this.form.fullname);
        profileData.append('title', this.form.title);
        profileData.append('description', this.form.description);
        if (this.form.photo) {
          profileData.append('photo', this.form.photo);
        }
        profileData.append('slug', this.slug);

        let profileResponse;
        // Actualizar el perfil existente o crear uno nuevo
        if (profileId) {
          profileResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}api/profiles/${profileId}`,
            profileData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.authStore.token}`
              }
            }
          );
        } else {
          profileResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}api/profiles`,
            profileData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.authStore.token}`
              }
            }
          );

          // Actualizar los datos del perfil después de crear uno nuevo
          profileResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}api/profiles/user/${this.route.params.id}`,
            {
              headers: {
                'Authorization': `Bearer ${this.authStore.token}`
              }
            }
          );
        }

        if (!profileResponse.data) {
          throw new Error('Error al guardar el perfil');
        }

        const updatedProfile = profileResponse.data;
        const newSocialNetworks = [];

        // Eliminar todas las redes sociales existentes
        if (socialNetworks && socialNetworks.length > 0) {
          for (const social of socialNetworks) {
            await axios.delete(
              `${import.meta.env.VITE_BACKEND_URL}api/social-networks/${social.id}`,
              {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${this.authStore.token}`
                }
              }
            );
          }
        }

        // Añadir todas las redes sociales nuevas
        for (const social of this.form.socialMediaList) {
          const socialData = {
            profile_id: updatedProfile.id,
            network_name: social.platform,
            url: social.url
          };

          const socialResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}api/social-networks`,
            socialData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.authStore.token}`
              }
            }
          );

          if (!socialResponse.data) {
            throw new Error('Error al guardar las redes sociales');
          }

          newSocialNetworks.push(socialResponse.data);
        }

        // Actualizar los stores con los datos nuevos
        this.profileStore.setProfile(updatedProfile);
        this.profileStore.setSocialNetworks(newSocialNetworks);

        console.log('Cambios guardados correctamente');
      } catch (error) {
        // Manejo de errores
        console.error('Error al guardar los cambios:', error);
        // Manejo específico del error de slug
        if (error.response !== null && error.response.data.error) {
          this.errors.general = 'No estás autenticado para realizar los cambios'
        } else if (error.response && error.response.data.errors.slug !== null) {
          this.errors.slug = 'El Nombre ya ha sido escogido por otro usuario';
        } else {
          // Otros errores
          this.errors.general = 'Ha ocurrido un error al guardar los cambios';
        }
      } finally {
        // Cambiar el estado de carga
        this.isLoading = false;
      }
    },
    // Método para generar un slug a partir del nombre completo
    generateSlug() {
      return this.form.fullname
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }
  },
  watch: {
    // Observador para actualizar los datos del formulario cuando cambia el perfil
    'profileStore.profile'(newProfile) {
      if (newProfile) {
        this.form.fullname = newProfile.full_name || '';
        this.form.title = newProfile.title || '';
        this.form.description = newProfile.description || '';
        this.fileName = newProfile.photo_url || 'Ningún archivo seleccionado';
        this.slug = newProfile.slug || '';
      }
    },
    // Observador para actualizar las redes sociales del formulario cuando cambian
    'profileStore.socialNetworks'(newSocialNetworks) {
      if (newSocialNetworks) {
        this.form.socialMediaList = newSocialNetworks.map(network => ({
          platform: network.network_name,
          url: network.url
        }));
      }
    },
    // Observador para generar el slug automáticamente cuando cambia el nombre completo
    'form.fullname'(newFullname) {
      this.slug = this.generateSlug();
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