<template>
  <div>
    <section class="hero-features">
      <div class="container">
        <h2 class="hero-features__title">Descubre las Características de TalentShowcase</h2>
        <p class="hero-features__subtitle">Potencia tu portafolio con nuestras funcionalidades clave</p>
      </div>
    </section>

    <section class="key-features">
      <div class="container">
        <h3 class="key-features__title">Funcionalidades clave</h3>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-user"></i>
            </div>
            <h4 class="feature-title">Gestión de Usuarios</h4>
            <p class="feature-description">
              Crea y personaliza tu perfil, añade redes sociales, idiomas y
              habilidades.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-pen"></i>
            </div>
            <h4 class="feature-title">Personalización Completa</h4>
            <p class="feature-description">
              Personaliza secciones, colores, servicios y contenido de tu
              portafolio.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-box"></i>
            </div>
            <h4 class="feature-title">Gestión de Archivos</h4>
            <p class="feature-description">
              Sube imágenes fácilmente con integración de Cloudinary.
            </p>
          </div>

          <div class="feature-card">
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

    <section class="additional-details">
      <div class="container">
        <h3 class="details__title">Detalles Adicionales</h3>
        <div class="details-grid">
          <div class="detail-card">
            <h4 class="detail-title">Visualización Pública</h4>
            <p class="detail-description">
              Tu portafolio será accesible para todo el público mediante un enlace único.
            </p>
          </div>

          <div class="detail-card">
            <h4 class="detail-title">Administración Centralizada</h4>
            <p class="detail-description">
              Los administradores pueden gestionar usuarios y portafolios de manera eficiente.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Characteristics'
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
  background-color: white;
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
  background-color: white;
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