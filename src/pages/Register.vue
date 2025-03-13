<template>
  <!-- Página de registro con soporte para modo oscuro -->
  <div>
    <!-- Sección de registro con clase dinámica para modo oscuro -->
    <section class="register" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <!-- Tarjeta de registro con clase dinámica para modo oscuro -->
        <div class="register__card" :class="{ 'dark-mode': isDarkMode }">
          <!-- Título de la página -->
          <h2 class="register__title">Registrarse</h2>

          <!-- Formulario de registro con prevención de envío por defecto -->
          <form @submit.prevent="handleSubmit">
            <!-- Grupo de formulario: Nombre de usuario -->
            <div class="form-group">
              <label for="username" class="form-label">Nombre de usuario</label>
              <input type="text" id="username" class="form-input" v-model="form.username" @blur="validateUsername" />
              <!-- Mensaje de error para nombre de usuario -->
              <div class="error-message" v-if="!usernameValid">
                Por favor ingresa un nombre de usuario válido (mínimo 3 caracteres)
              </div>
            </div>

            <!-- Grupo de formulario: Correo electrónico -->
            <div class="form-group">
              <label for="email" class="form-label">Correo Electrónico</label>
              <input type="email" id="email" class="form-input" v-model="form.email" @blur="validateEmail" />
              <!-- Mensaje de error para correo electrónico -->
              <div class="error-message" v-if="!emailValid">
                Por favor ingresa un correo electrónico válido
              </div>
            </div>

            <!-- Grupo de formulario: Contraseña -->
            <div class="form-group">
              <label for="password" class="form-label">Contraseña</label>
              <input type="password" id="password" class="form-input" v-model="form.password"
                @blur="validatePassword" />
              <!-- Mensaje de error para contraseña -->
              <div class="error-message" v-if="!passwordValid">
                Por favor ingresa una contraseña válida (mínimo 8 caracteres)
              </div>
            </div>

            <!-- Grupo de formulario: Confirmación de contraseña -->
            <div class="form-group">
              <label for="confirmPassword" class="form-label">Repite contraseña</label>
              <input type="password" id="confirmPassword" class="form-input" v-model="form.confirmPassword"
                @blur="validateConfirmPassword" />
              <!-- Mensaje de error para confirmación de contraseña -->
              <div class="error-message" v-if="!confirmPasswordValid">
                Las contraseñas no coinciden
              </div>
            </div>

            <!-- Grupo de formulario: Términos y condiciones -->
            <div class="form-group">
              <div class="terms">
                <input type="checkbox" id="terms" v-model="form.terms" @change="validateTerms" />
                <label for="terms" class="form-label terms-label">
                  Acepto los <a href="#">Términos y Condiciones</a>
                </label>
              </div>
              <!-- Mensaje de error para términos y condiciones -->
              <div class="error-message" v-if="!termsValid">
                Debes aceptar los términos y condiciones
              </div>
            </div>

            <!-- Botón de submit con estado de carga -->
            <button type="submit" class="btn--submit" :disabled="isLoading"
              :style="isLoading ? { backgroundColor: 'var(--botones-300)' } : {}">
              {{ isLoading ? 'Registrándose...' : 'Registrarse' }}
            </button>

            <!-- Enlaces relacionados -->
            <div class="register__links">
              <p>
                ¿Ya tienes cuenta?
                <router-link :to="{ name: 'Login' }">Inicia sesión</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Modal para mostrar errores -->
    <Modal v-if="showErrorModal" :title="errorMessageTitle" :message="errorMessage" @close="showErrorModal = false" />
  </div>
</template>

<script>
// Importación de stores y componentes necesarios
import { useThemeStore } from '../stores/themeStore';
import Modal from '../components/Modal.vue';
import { useAuthStore } from '../stores/authStore';

export default {
  name: 'Register',
  components: {
    Modal
  },
  computed: {
    // Propiedad computada para el modo oscuro
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  },
  data() {
    return {
      // Datos del formulario
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      },
      // Estados de validación de cada campo
      usernameValid: true,
      emailValid: true,
      passwordValid: true,
      confirmPasswordValid: true,
      termsValid: true,
      // Estado de carga y modal de error
      isLoading: false,
      showErrorModal: false,
      errorMessageTitle: '',
      errorMessage: ''
    };
  },
  methods: {
    // Validación del nombre de usuario
    validateUsername() {
      this.usernameValid = this.form.username.trim().length >= 3;
    },
    // Validación del correo electrónico
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailValid = emailRegex.test(this.form.email);
    },
    // Validación de la contraseña
    validatePassword() {
      this.passwordValid = this.form.password.trim().length >= 8;
    },
    // Validación de la confirmación de contraseña
    validateConfirmPassword() {
      this.confirmPasswordValid = this.form.password === this.form.confirmPassword;
    },
    // Validación de los términos y condiciones
    validateTerms() {
      this.termsValid = this.form.terms;
    },
    // Manejador de envío del formulario
    async handleSubmit() {
      // Validamos todos los campos
      this.validateUsername();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();
      this.validateTerms();

      if (this.isLoading) return;

      this.isLoading = true;

      try {
        // Registro del usuario
        const registerResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/users`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              username: this.form.username,
              email: this.form.email,
              password: this.form.password
            })
          }
        );

        if (registerResponse.ok) {
          // Inicio de sesión después del registro
          const loginResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                email: this.form.email,
                password: this.form.password
              })
            }
          );

          if (loginResponse.ok) {
            // Actualizamos el store de autenticación
            const data = await loginResponse.json();
            const authStore = useAuthStore();
            authStore.setToken(data.token);
            authStore.setUser(data.user);
            // Redireccionamos al perfil del usuario
            this.$router.push({ name: 'Profile', params: { id: data.user.id } });
          } else {
            // Manejo de errores de inicio de sesión
            const errorData = await loginResponse.json();
            this.handleLoginError(errorData);
          }
        } else {
          // Manejo de errores de registro
          const errorData = await registerResponse.json();
          this.handleRegistrationError(errorData);
        }
      } catch (error) {
        // Manejo de errores generales
        this.showGenericError();
      } finally {
        this.isLoading = false;
      }
    },
    // Manejo de errores de registro
    handleRegistrationError(errorData) {
      if (errorData && errorData.message) {
        // Traducimos el mensaje de error
        let translatedMessage = this.translateErrorMessage(errorData.message);

        this.errorMessageTitle = 'Error de registro';
        this.errorMessage = translatedMessage;
        this.showErrorModal = true;
      } else {
        this.showGenericError();
      }
    },
    // Manejo de errores de inicio de sesión
    handleLoginError(errorData) {
      if (errorData && errorData.message) {
        this.errorMessageTitle = 'Error de inicio de sesión';
        this.errorMessage = 'Las credenciales ingresadas no son válidas. Por favor, inténtalo de nuevo.';
        this.showErrorModal = true;
      } else {
        this.showGenericError();
      }
    },
    // Traducción de mensajes de error del backend
    translateErrorMessage(message) {
      const translations = {
        'The username has already been taken.': 'El nombre de usuario ya está en uso.',
        'The email has already been taken.': 'El correo electrónico ya está en uso.',
        'The username has already been taken. (and 1 more error)': 'El nombre de usuario ya está en uso. (y 1 error más)',
      };

      return translations[message] || message;
    },
    // Mostrar mensaje de error genérico
    showGenericError() {
      this.errorMessageTitle = 'Error';
      this.errorMessage = 'Ha ocurrido un error durante el proceso. Por favor, inténtalo de nuevo más tarde.';
      this.showErrorModal = true;
    }
  }
};
</script>

<style scoped>
/* Estilos base para la página de registro */
.register {
  background: linear-gradient(to right, var(--hover-400), var(--hover-100));
  padding: 16rem 0 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.register__card {
  background-color: white;
  padding: 2rem;
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
  width: 40rem;
}

/* Estilos para el título de la página */
.register__title {
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-title-desktop);
  color: var(--neutral-textos-900);
  text-align: center;
  margin-bottom: 2rem;
}

/* Estilos para los grupos de formulario */
.form-group {
  margin-bottom: 1.5rem;
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

/* Estilos para los inputs del formulario */
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--neutral-textos-300);
  border-radius: 0.3125rem;
  font-family: var(--font-family-text-normal);
  font-size: var(--font-size-text-normal);
}

/* Estilos para inputs inválidos */
.form-input:invalid {
  border-color: var(--errors-500);
}

/* Estilos para mensajes de error */
.error-message {
  color: var(--errors-500);
  font-size: var(--font-size-text-small-mobile);
  margin-top: 0.25rem;
}

/* Estilos para los términos y condiciones */
.terms {
  display: flex;
  align-items: center;
}

#terms {
  margin-right: 0.75rem;
  margin-bottom: 0.5rem;
}

.terms-label a {
  color: var(--primario-500);
  text-decoration: none;
  margin-left: 0.25rem;
}

.terms-label a:hover {
  text-decoration: underline;
}

/* Estilos para el botón de submit */
.btn--submit {
  background-color: var(--botones-400);
  color: var(--neutral-textos-50);
  border: none;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  width: 100%;
  margin-top: 1rem;
}

.btn--submit:hover {
  background-color: var(--botones-500);
}

.btn--submit:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/* Estilos para los enlaces relacionados */
.register__links {
  margin-top: 1.5rem;
  text-align: center;
}

.register__links p {
  margin-bottom: 0.5rem;
  font-family: var(--font-family-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
}

.register__links a {
  color: var(--primario-500);
  text-decoration: none;
}

.register__links a:hover {
  text-decoration: underline;
}

/* Estilos específicos para modo oscuro */
.register.dark-mode {
  background: var(--primario-900);
}

.register__card.dark-mode {
  background-color: var(--primario-700);
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-900), 0.2);
}

.register.dark-mode .register__title {
  color: var(--neutral-textos-200);
}

.register.dark-mode .form-label {
  color: var(--neutral-textos-400);
}

.register.dark-mode .form-input {
  background-color: var(--primario-600);
  border-color: var(--neutral-textos-500);
  color: var(--neutral-textos-200);
}

.register.dark-mode .form-input:invalid {
  border-color: var(--errors-500);
}

.register.dark-mode .error-message {
  color: var(--errors-500);
}

.register.dark-mode .btn--submit {
  background-color: var(--botones-900);
  color: var(--neutral-textos-100);
}

.register.dark-mode .btn--submit:hover {
  background-color: var(--botones-600);
}

.register.dark-mode .register__links p {
  color: var(--neutral-textos-400);
}

.register.dark-mode .register__links a {
  color: var(--botones-300);
}

.register.dark-mode .terms-label a {
  color: var(--botones-300);
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .register {
    padding: 16rem 0 4rem;
  }

  .register__card {
    width: 90%;
    padding: 1.5rem;
  }

  .register__title {
    font-size: var(--font-size-title-mobile);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .btn--submit {
    padding: 0.75rem;
  }
}
</style>