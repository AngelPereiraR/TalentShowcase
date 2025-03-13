<template>
  <!-- Página de inicio de sesión con soporte para modo oscuro -->
  <div>
    <!-- Sección de inicio de sesión con clase dinámica para modo oscuro -->
    <section class="login" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <!-- Tarjeta de inicio de sesión con clase dinámica para modo oscuro -->
        <div class="login__card" :class="{ 'dark-mode': isDarkMode }">
          <!-- Título de la página -->
          <h2 class="login__title">Iniciar Sesión</h2>

          <!-- Formulario de inicio de sesión con prevención de envío por defecto -->
          <form @submit.prevent="handleSubmit">
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

            <!-- Botón de submit con estado de carga -->
            <button type="submit" class="btn--submit" :disabled="isLoading"
              :style="isLoading ? { backgroundColor: 'var(--botones-300)' } : {}">
              {{ isLoading ? 'Cargando...' : 'Iniciar Sesión' }}
            </button>

            <!-- Enlaces relacionados -->
            <div class="login__links">
              <p>
                ¿No tienes cuenta?
                <router-link :to="{ name: 'Register' }">Regístrate aquí</router-link>
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
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import Modal from '../components/Modal.vue';

export default {
  name: 'Login',
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
        email: '',
        password: ''
      },
      // Estados de validación de cada campo
      emailValid: true,
      passwordValid: true,
      // Estado de carga y modal de error
      isLoading: false,
      showErrorModal: false,
      errorMessageTitle: '',
      errorMessage: ''
    }
  },
  created() {
    // Verificar si el usuario ya está autenticado al cargar el componente
    const authStore = useAuthStore();
    const router = useRouter();

    if (authStore.isAuthenticated) {
      // Redirigir al perfil si el usuario ya está autenticado
      const userId = authStore.user.id;
      router.push({ name: 'Profile', params: { id: userId } });
    }
  },
  methods: {
    // Validación del correo electrónico
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailValid = emailRegex.test(this.form.email);
    },
    // Validación de la contraseña
    validatePassword() {
      this.passwordValid = this.form.password.trim().length >= 8;
    },
    // Manejador de envío del formulario
    async handleSubmit() {
      // Validar campos antes de enviar
      this.validateEmail();
      this.validatePassword();

      if (this.emailValid && this.passwordValid && !this.isLoading) {
        this.isLoading = true;

        try {
          // Realizar solicitud de inicio de sesión
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(this.form)
            }
          );

          if (response.ok) {
            // Actualizar store de autenticación con datos del usuario
            const data = await response.json();
            const authStore = useAuthStore();
            authStore.setToken(data.token);
            authStore.setUser(data.user);
            // Redirigir al perfil del usuario
            this.$router.push({ name: 'Profile', params: { id: data.user.id } });
          } else {
            // Manejar errores de inicio de sesión
            const errorData = await response.json();
            this.handleLoginError(errorData);
          }
        } catch (error) {
          // Mostrar error genérico en caso de fallo de red u otro error
          this.showGenericError();
        } finally {
          this.isLoading = false;
        }
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
    // Mostrar mensaje de error genérico
    showGenericError() {
      this.errorMessageTitle = 'Error';
      this.errorMessage = 'Ha ocurrido un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
      this.showErrorModal = true;
    }
  }
}
</script>

<style scoped>
/* Estilos base para la página de inicio de sesión */
.login {
  background: linear-gradient(to right, var(--hover-400), var(--hover-100));
  padding: 16rem 0 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 95vh;
}

.login.dark-mode {
  background: var(--primario-900);
}

/* Estilos para la tarjeta de inicio de sesión */
.login__card {
  background-color: white;
  padding: 2rem;
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
  width: 40rem;
}

.login__card.dark-mode {
  background-color: var(--primario-700);
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-900), 0.2);
}

/* Estilos para el título de la página */
.login__title {
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-title-desktop);
  color: var(--neutral-textos-900);
  text-align: center;
  margin-bottom: 2rem;
}

.login.dark-mode .login__title {
  color: var(--neutral-textos-200);
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

.login.dark-mode .form-label {
  color: var(--neutral-textos-400);
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

.login.dark-mode .form-input {
  background-color: var(--primario-600);
  border-color: var(--neutral-textos-500);
  color: var(--neutral-textos-200);
}

.form-input:invalid {
  border-color: var(--errors-500);
}

.login.dark-mode .form-input:invalid {
  border-color: var(--errors-500);
}

/* Estilos para mensajes de error */
.error-message {
  color: var(--errors-500);
  font-size: var(--font-size-text-small-mobile);
  margin-top: 0.25rem;
}

.login.dark-mode .error-message {
  color: var(--errors-500);
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

.login.dark-mode .btn--submit {
  background-color: var(--botones-900);
  color: var(--neutral-textos-100);
}

.login.dark-mode .btn--submit:hover {
  background-color: var(--botones-600);
}

.btn--submit:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/* Estilos para los enlaces relacionados */
.login__links {
  margin-top: 1.5rem;
  text-align: center;
}

.login__links p {
  margin-bottom: 0.5rem;
  font-family: var(--font-family-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
}

.login.dark-mode .login__links p {
  color: var(--neutral-textos-400);
}

.login__links a {
  color: var(--primario-500);
  text-decoration: none;
}

.login.dark-mode .login__links a {
  color: var(--botones-300);
}

.login__links a:hover {
  text-decoration: underline;
}

/* Adaptaciones para pantallas pequeñas */
@media (max-width: 768px) {
  .login {
    padding: 16rem 0 4rem;
  }

  .login__title {
    font-size: var(--font-size-title-mobile);
  }

  .login__card {
    width: 100%;
    padding: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .btn--submit {
    padding: 0.75rem;
  }
}
</style>