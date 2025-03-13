<template>
  <!-- Página de características de la aplicación con soporte para modo oscuro -->
  <div>
    <!-- Sección Héroe de Características -->
    <section class="hero-features" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <!-- Título de la sección Héroe -->
        <h2 class="hero-features__title">Descubre las Características de TalentShowcase</h2>
        <!-- Subtítulo de la sección Héroe -->
        <p class="hero-features__subtitle">Potencia tu portafolio con nuestras funcionalidades clave</p>
      </div>
    </section>

    <!-- Sección de Funcionalidades Clave -->
    <section class="key-features" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <!-- Título de la sección de Funcionalidades -->
        <h3 class="key-features__title">Funcionalidades clave</h3>
        <!-- Grid de tarjetas de características -->
        <div class="features-grid">
          <!-- Tarjeta de Gestión de Usuarios -->
          <div class="feature-card" :class="{ 'dark-mode': isDarkMode }">
            <div class="feature-icon">
              <i class="fas fa-user"></i>
            </div>
            <h4 class="feature-title">Gestión de Usuarios</h4>
            <p class="feature-description">
              Crea y personaliza tu perfil, añade redes sociales y
              habilidades.
            </p>
          </div>

          <!-- Tarjeta de Personalización Completa -->
          <div class="feature-card" :class="{ 'dark-mode': isDarkMode }">
            <div class="feature-icon">
              <i class="fas fa-pen"></i>
            </div>
            <h4 class="feature-title">Personalización Completa</h4>
            <p class="feature-description">
              Personaliza secciones, colores, servicios y contenido de tu
              portafolio.
            </p>
          </div>

          <!-- Tarjeta de Gestión de Archivos -->
          <div class="feature-card" :class="{ 'dark-mode': isDarkMode }">
            <div class="feature-icon">
              <i class="fas fa-box"></i>
            </div>
            <h4 class="feature-title">Gestión de Archivos</h4>
            <p class="feature-description">
              Sube imágenes fácilmente con integración de Cloudinary.
            </p>
          </div>

          <!-- Tarjeta de Seguridad y Privacidad -->
          <div class="feature-card" :class="{ 'dark-mode': isDarkMode }">
            <div class="feature-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4 class="feature-title">Seguridad y Privacidad</h4>
            <p class="feature-description">
              Protección de datos y autenticación segura con JSON Web Tokens (JWT).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Detalles Adicionales -->
    <section class="additional-details" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <!-- Título de la sección de Detalles -->
        <h3 class="details__title">Detalles Adicionales</h3>
        <!-- Grid de tarjetas de detalles -->
        <div class="details-grid">
          <!-- Tarjeta de Visualización Pública -->
          <div class="detail-card" :class="{ 'dark-mode': isDarkMode }">
            <h4 class="detail-title">Visualización Pública</h4>
            <p class="detail-description">
              Tu portafolio será accesible para todo el público mediante un enlace único.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Importación del store de tema para el modo oscuro
import { useThemeStore } from '../stores/themeStore';

export default {
  name: 'Characteristics',
  computed: {
    // Propiedad computada para determinar si está activado el modo oscuro
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  }
}
</script>

<style scoped>
/* Estilos base para la sección Héroe de Características */
.hero-features {
  background: linear-gradient(to right, var(--hover-400), var(--hover-100));
  padding: 16rem 0 10rem;
  text-align: center;
  color: var(--neutral-textos-900);
}

.hero-features.dark-mode {
  background: var(--primario-900);
  color: var(--neutral-textos-200);
}

/* Estilos para el título y subtítulo de la sección Héroe */
.hero-features__title {
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-title-desktop);
  margin-bottom: 1.25rem;
}

.hero-features__subtitle {
  font-family: var(--font-family-text-large);
  font-weight: var(--font-weight-text-large);
  font-size: var(--font-size-text-large);
  margin-bottom: 1.875rem;
}

/* Estilos base para la sección de Funcionalidades Clave */
.key-features {
  padding: 6rem 0;
  text-align: center;
}

.key-features.dark-mode {
  background-color: var(--neutral-textos-700);
}

/* Estilos para el título de la sección de Funcionalidades */
.key-features__title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  margin-bottom: 3rem;
  color: var(--neutral-textos-900);
}

.key-features.dark-mode .key-features__title {
  color: var(--neutral-textos-200);
}

/* Estilos para el grid de características */
.features-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

/* Estilos para las tarjetas de características */
.feature-card {
  background-color: var(--neutral-textos-50);
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
  padding: 2rem;
  max-width: 24rem;
  text-align: center;
}

.feature-card.dark-mode {
  background-color: var(--primario-600);
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-900), 0.2);
}

/* Estilos para los iconos de las características */
.feature-icon {
  font-size: 3rem;
  color: var(--primario-400);
  margin-bottom: 1.25rem;
}

.feature-card.dark-mode .feature-icon {
  color: var(--botones-300);
}

/* Estilos para los títulos de las características */
.feature-title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--neutral-textos-900);
}

.feature-card.dark-mode .feature-title {
  color: var(--neutral-textos-200);
}

/* Estilos para las descripciones de las características */
.feature-description {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
  line-height: 1.6;
}

.feature-card.dark-mode .feature-description {
  color: var(--neutral-textos-200);
}

/* Estilos base para la sección de Detalles Adicionales */
.additional-details {
  background-color: var(--primario-100);
  padding: 6rem 0;
  text-align: center;
  color: var(--neutral-textos-900);
}

.additional-details.dark-mode {
  background-color: var(--primario-800);
  color: var(--neutral-textos-200);
}

/* Estilos para el título de la sección de Detalles */
.details__title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  margin-bottom: 3rem;
}

/* Estilos para el grid de detalles */
.details-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

/* Estilos para las tarjetas de detalles */
.detail-card {
  background-color: var(--neutral-textos-50);
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
  padding: 2rem;
  max-width: 28rem;
  text-align: center;
}

.detail-card.dark-mode {
  background-color: var(--primario-600);
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-900), 0.2);
}

/* Estilos para los títulos de los detalles */
.detail-title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--neutral-textos-900);
}

.detail-card.dark-mode .detail-title {
  color: var(--neutral-textos-200);
}

/* Estilos para las descripciones de los detalles */
.detail-description {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
  line-height: 1.6;
}

.detail-card.dark-mode .detail-description {
  color: var(--neutral-textos-200);
}

/* Adaptaciones para pantallas pequeñas */
@media (max-width: 768px) {
  .hero-features {
    padding: 16rem 0 4rem;
  }

  .hero-features__title {
    font-size: var(--font-size-title-mobile);
  }

  .hero-features__subtitle {
    font-size: var(--font-size-text-normal);
  }

  .key-features {
    padding: 4rem 0;
  }

  .key-features__title {
    font-size: var(--font-size-menu-mobile);
  }

  .features-grid,
  .details-grid {
    flex-direction: column;
    align-items: center;
  }

  .feature-card,
  .detail-card {
    max-width: 80%;
    margin: 0 auto;
  }

  .details__title {
    font-size: var(--font-size-menu-mobile);
  }

  .additional-details {
    padding: 4rem 0;
  }
}
</style>