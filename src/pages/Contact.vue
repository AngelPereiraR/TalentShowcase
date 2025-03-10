<template>
  <div>
    <section class="contact-header" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <h2 class="contact__title">¿Tienes alguna duda o sugerencia?</h2>
        <p class="contact__subtitle">
          Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible
        </p>
      </div>
    </section>

    <section class="contact-form" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <form class="form-container" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="fullname" class="form-label">Nombre completo</label>
            <input type="text" id="fullname" class="form-input" v-model="form.fullname" @blur="validateFullname" />
            <div class="error-message" v-if="!fullnameValid">Por favor ingresa tu nombre completo</div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input type="email" id="email" class="form-input" v-model="form.email" @blur="validateEmail" />
            <div class="error-message" v-if="!emailValid">Por favor ingresa un correo electrónico válido</div>
          </div>

          <div class="form-group">
            <label for="subject" class="form-label">Asunto</label>
            <input type="text" id="subject" class="form-input" v-model="form.subject" @blur="validateSubject" />
            <div class="error-message" v-if="!subjectValid">Por favor ingresa un asunto</div>
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Mensaje</label>
            <textarea id="message" class="form-textarea" v-model="form.message" @blur="validateMessage"></textarea>
            <div class="error-message" v-if="!messageValid">Por favor ingresa un mensaje</div>
          </div>

          <button type="submit" class="btn--submit">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { useThemeStore } from '../stores/themeStore';

export default {
  name: 'Contact',
  computed: {
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  },
  data() {
    return {
      form: {
        fullname: '',
        email: '',
        subject: '',
        message: ''
      },
      fullnameValid: true,
      emailValid: true,
      subjectValid: true,
      messageValid: true
    }
  },
  methods: {
    validateFullname() {
      this.fullnameValid = this.form.fullname.trim().length > 0
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.emailValid = emailRegex.test(this.form.email)
    },
    validateSubject() {
      this.subjectValid = this.form.subject.trim().length > 0
    },
    validateMessage() {
      this.messageValid = this.form.message.trim().length > 0
    },
    handleSubmit() {
      this.validateFullname()
      this.validateEmail()
      this.validateSubject()
      this.validateMessage()

      if (this.fullnameValid && this.emailValid && this.subjectValid && this.messageValid) {
        // Aquí iría la lógica para enviar el formulario
        console.log('Formulario enviado:', this.form)
        // Reiniciar el formulario
        this.form = {
          fullname: '',
          email: '',
          subject: '',
          message: ''
        }
        // Restaurar la validación
        this.fullnameValid = true
        this.emailValid = true
        this.subjectValid = true
        this.messageValid = true
      }
    }
  }
}
</script>

<style scoped>
.contact-header {
  padding: 16rem 0 10rem;
  text-align: center;
  background-color: var(--neutral-textos-50);
}

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

.contact-form {
  padding: 4rem 0;
  background-color: var(--neutral-textos-50);
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--neutral-textos-300);
  border-radius: 0.3125rem;
  font-family: var(--font-family-text-normal);
  font-size: var(--font-size-text-normal);
}

.form-input:invalid,
.form-textarea:invalid {
  border-color: var(--errors-500);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.error-message {
  color: var(--errors-500);
  font-size: var(--font-size-text-small-mobile);
  margin-top: 0.25rem;
}

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

.btn--submit:hover {
  background-color: var(--botones-500);
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

.contact-form.dark-mode {
  background-color: var(--primario-800);
}

.contact-form.dark-mode .form-container {
  background-color: var(--primario-700);
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-900), 0.2);
}

.contact-form.dark-mode .form-label {
  color: var(--neutral-textos-400);
}

.contact-form.dark-mode .form-input,
.contact-form.dark-mode .form-textarea {
  background-color: var(--primario-600);
  border-color: var(--neutral-textos-500);
  color: var(--neutral-textos-200);
}

.contact-form.dark-mode .form-input:invalid,
.contact-form.dark-mode .form-textarea:invalid {
  border-color: var(--errors-500);
}

.contact-form.dark-mode .error-message {
  color: var(--errors-500);
}

.contact-form.dark-mode .btn--submit {
  background-color: var(--botones-900);
  color: var(--neutral-textos-100);
}

.contact-form.dark-mode .btn--submit:hover {
  background-color: var(--botones-600);
}

/* Media Queries para pantallas pequeñas */
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