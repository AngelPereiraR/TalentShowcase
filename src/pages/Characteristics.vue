<template>
  <div>
    <section class="hero-features" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <h2 class="hero-features__title">Descubre las Características de TalentShowcase</h2>
        <p class="hero-features__subtitle">Potencia tu portafolio con nuestras funcionalidades clave</p>
      </div>
    </section>

    <section class="key-features" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <h3 class="key-features__title">Funcionalidades clave</h3>
        <div class="features-grid">
          <div class="feature-card" :class="{ 'dark-mode': isDarkMode }">
            <div class="feature-icon">
              <i class="fas fa-user"></i>
            </div>
            <h4 class="feature-title">Gestión de Usuarios</h4>
            <p class="feature-description">
              Crea y personaliza tu perfil, añade redes sociales, idiomas y
              habilidades.
            </p>
          </div>

          <!-- Resto de feature-cards con la misma clase condicional -->

        </div>
      </div>
    </section>

    <section class="additional-details" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <h3 class="details__title">Detalles Adicionales</h3>
        <div class="details-grid">
          <div class="detail-card" :class="{ 'dark-mode': isDarkMode }">
            <h4 class="detail-title">Visualización Pública</h4>
            <p class="detail-description">
              Tu portafolio será accesible para todo el público mediante un enlace único.
            </p>
          </div>

          <!-- Resto de detail-cards con la misma clase condicional -->

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useThemeStore } from '../stores/themeStore';

export default {
  name: 'Characteristics',
  computed: {
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  }
}
</script>

<style scoped>
.hero-features {
  background: linear-gradient(to right, var(--hover-400), var(--hover-100));
  padding: 16rem 0 10rem;
  text-align: center;
  color: var(--neutral-textos-900);
}

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

.key-features {
  padding: 6rem 0;
  text-align: center;
}

.key-features__title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  margin-bottom: 3rem;
  color: var(--neutral-textos-900);
}

.features-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.feature-card {
  background-color: var(--neutral-textos-50);
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
  padding: 2rem;
  max-width: 24rem;
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  color: var(--primario-400);
  margin-bottom: 1.25rem;
}

.feature-title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--neutral-textos-900);
}

.feature-description {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
  line-height: 1.6;
}

.additional-details {
  background-color: var(--primario-100);
  padding: 6rem 0;
  text-align: center;
  color: var(--neutral-textos-900);
}

.details__title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  margin-bottom: 3rem;
}

.details-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.detail-card {
  background-color: var(--neutral-textos-50);
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
  padding: 2rem;
  max-width: 28rem;
  text-align: center;
}

.detail-title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--neutral-textos-900);
}

.detail-description {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
  line-height: 1.6;
}

.hero-features.dark-mode {
  background: var(--primario-900);
  color: var(--neutral-textos-200);
}

.key-features.dark-mode {
  background-color: var(--neutral-textos-700);
}

.key-features.dark-mode .key-features__title {
  color: var(--neutral-textos-200);

}

.feature-card.dark-mode {
  background-color: var(--primario-600);
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-900), 0.2);
}

.feature-card.dark-mode .feature-icon {
  color: var(--botones-300);
}

.feature-card.dark-mode .feature-title,
.feature-card.dark-mode .feature-description {
  color: var(--neutral-textos-200);
}

.additional-details.dark-mode {
  background-color: var(--primario-800);
  color: var(--neutral-textos-200);
}

.detail-card.dark-mode {
  background-color: var(--primario-600);
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-900), 0.2);
}

.detail-card.dark-mode .detail-title,
.detail-card.dark-mode .detail-description {
  color: var(--neutral-textos-200);
}

/* Media Queries para pantallas pequeñas */
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