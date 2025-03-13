<template>
  <!-- Página de contacto con soporte para modo oscuro -->
  <div>
    <!-- Sección de cabecera de contacto -->
    <section class="contact-header" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <!-- Título de la sección de contacto -->
        <h2 class="contact__title">¿Tienes alguna duda o sugerencia?</h2>
        <!-- Subtítulo de la sección de contacto -->
        <p class="contact__subtitle">
          Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible
        </p>
      </div>
    </section>

    <!-- Sección del formulario de contacto -->
    <section class="contact-form" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <!-- Formulario de contacto -->
        <form class="form-container" @submit.prevent="handleSubmit">
          <!-- Campo de nombre completo -->
          <div class="form-group">
            <label for="fullname" class="form-label">Nombre completo</label>
            <input type="text" id="fullname" class="form-input" v-model="form.fullname" @blur="validateFullname" />
            <!-- Mensaje de error para nombre completo -->
            <div class="error-message" v-if="!fullnameValid">
              Por favor ingresa tu nombre completo
            </div>
          </div>

          <!-- Campo de correo electrónico -->
          <div class="form-group">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input type="email" id="email" class="form-input" v-model="form.email" @blur="validateEmail" />
            <!-- Mensaje de error para correo electrónico -->
            <div class="error-message" v-if="!emailValid">
              Por favor ingresa un correo electrónico válido
            </div>
          </div>

          <!-- Campo de asunto -->
          <div class="form-group">
            <label for="subject" class="form-label">Asunto</label>
            <input type="text" id="subject" class="form-input" v-model="form.subject" @blur="validateSubject" />
            <!-- Mensaje de error para asunto -->
            <div class="error-message" v-if="!subjectValid">Por favor ingresa un asunto</div>
          </div>

          <!-- Campo de mensaje -->
          <div class="form-group">
            <label for="message" class="form-label">Mensaje</label>
            <textarea id="message" class="form-textarea" v-model="form.message" @blur="validateMessage"></textarea>
            <!-- Mensaje de error para mensaje -->
            <div class="error-message" v-if="!messageValid">Por favor ingresa un mensaje</div>
          </div>

          <!-- Botón de enviar -->
          <button type="submit" class="btn--submit">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// Importación del store de tema para el modo oscuro
import { useThemeStore } from '../stores/themeStore';

export default {
  name: 'Contact',
  computed: {
    // Propiedad computada para determinar si está activado el modo oscuro
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  },
  data() {
    return {
      // Datos del formulario
      form: {
        fullname: '',
        email: '',
        subject: '',
        message: ''
      },
      // Estados de validación de cada campo
      fullnameValid: true,
      emailValid: true,
      subjectValid: true,
      messageValid: true
    };
  },
  methods: {
    // Validación del nombre completo
    validateFullname() {
      this.fullnameValid = this.form.fullname.trim().length > 0;
    },
    // Validación del correo electrónico
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailValid = emailRegex.test(this.form.email);
    },
    // Validación del asunto
    validateSubject() {
      this.subjectValid = this.form.subject.trim().length > 0;
    },
    // Validación del mensaje
    validateMessage() {
      this.messageValid = this.form.message.trim().length > 0;
    },
    // Manejador de envío del formulario
    handleSubmit() {
      // Validar todos los campos
      this.validateFullname();
      this.validateEmail();
      this.validateSubject();
      this.validateMessage();

      // Si todos los campos son válidos
      if (
        this.fullnameValid &&
        this.emailValid &&
        this.subjectValid &&
        this.messageValid
      ) {
        // Aquí iría la lógica para enviar el formulario a un servidor
        console.log('Formulario enviado:', this.form);

        // Reiniciar el formulario
        this.form = {
          fullname: '',
          email: '',
          subject: '',
          message: ''
        };

        // Restablecer los estados de validación
        this.fullnameValid = true;
        this.emailValid = true;
        this.subjectValid = true;
        this.messageValid = true;
      }
    }
  }
};
</script>

<style scoped>
/* Estilos base para la sección de cabecera de contacto */
.contact-header {
  padding: 16rem 0 10rem;
  text-align: center;
  background-color: var(--neutral-textos-50);
}

.contact-header.dark-mode {
  background-color: var(--primario-900);
  color: var(--neutral-textos-200);
}

.contact-header.dark-mode .contact__title {
  color: var(--neutral-textos-200);
}

.contact-header.dark-mode .contact__subtitle {
  color: var(--neutral-textos-400);
}

/* Estilos para el título y subtítulo de la sección de contacto */
.contact__title {
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-title-desktop);
  color: var(--neutral-textos-900);
  margin-bottom: 1.25rem;
}

.contact__subtitle {
  font-family: var(--font-family-text-large);
  font-weight: var(--font-weight-text-large);
  font-size: var(--font-size-text-large);
  color: var(--neutral-textos-700);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Estilos base para la sección del formulario de contacto */
.contact-form {
  padding: 4rem 0;
  background-color: var(--neutral-textos-50);
}

.contact-form.dark-mode {
  background-color: var(--primario-800);
}

/* Estilos para el contenedor del formulario */
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
}

.form-container.dark-mode {
  background-color: var(--primario-700);
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-900), 0.2);
}

/* Estilos para los grupos de formulario */
.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

/* Estilos para las etiquetas de los campos */
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
}

.form-label.dark-mode {
  color: var(--neutral-textos-400);
}

/* Estilos para los inputs y textarea del formulario */
.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--neutral-textos-300);
  border-radius: 0.3125rem;
  font-family: var(--font-family-text-normal);
  font-size: var(--font-size-text-normal);
}

.form-input.dark-mode,
.form-textarea.dark-mode {
  background-color: var(--primario-600);
  border-color: var(--neutral-textos-500);
  color: var(--neutral-textos-200);
}

.form-input:invalid,
.form-textarea:invalid {
  border-color: var(--errors-500);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Estilos para los mensajes de error */
.error-message {
  color: var(--errors-500);
  font-size: var(--font-size-text-small-mobile);
  margin-top: 0.25rem;
}

/* Estilos para el botón de enviar */
.btn--submit {
  background-color: var(--botones-400);
  color: var(--neutral-textos-50);
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;
}

.btn--submit.dark-mode {
  background-color: var(--botones-900);
  color: var(--neutral-textos-100);
}

.btn--submit:hover {
  background-color: var(--botones-500);
}

.btn--submit.dark-mode:hover {
  background-color: var(--botones-600);
}

/* Adaptaciones para pantallas pequeñas */
@media (max-width: 768px) {
  .contact-header {
    padding: 16rem 0 4rem;
  }

  .contact__title {
    font-size: var(--font-size-title-mobile);
  }

  .contact__subtitle {
    font-size: var(--font-size-text-normal);
  }

  .form-container {
    padding: 1.5rem;
    box-shadow: none;
  }

  .btn--submit {
    padding: 0.75rem 1.5rem;
  }
}
</style>