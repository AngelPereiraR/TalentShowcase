<template>
  <!-- Pie de página con soporte para modo oscuro -->
  <footer class="footer" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="footer__content">
        <!-- Sección de copyright -->
        <div class="footer__copyright">
          <a href="https://talentshowcase-ampr.netlify.app/" target="_blank"
            rel="noopener noreferrer">TalentShowcase</a> © 2025 by <a href="https://portfolio-angelpereira.netlify.app/"
            target="_blank" rel="noopener noreferrer">Ángel Pereira</a> is
          licensed under
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" class="link--external">CC
            BY-NC-ND 4.0</a>
        </div>
        <!-- Sección de contacto -->
        <div class="footer__contact">
          <router-link :to="{ name: 'Contact' }" class="link--internal">Contacta con nosotros</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// Importación del store de tema para el modo oscuro
import { useThemeStore } from '../stores/themeStore';

export default {
  name: 'Footer',
  computed: {
    // Propiedad computada para determinar si está activado el modo oscuro
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  }
}
</script>

<style scoped>
/* Estilos base para el pie de página */
.footer {
  background-color: var(--neutral-textos-100);
  padding: 1.25rem 0;
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
}

.footer.dark-mode {
  background-color: var(--neutral-textos-800);
}

.footer.dark-mode,
.footer.dark-mode a {
  color: var(--neutral-textos-200);
}

/* Contenedor del contenido del pie de página */
.footer__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Contenedor principal */
.container {
  max-width: 90%;
  margin: 0 auto;
  padding: 0 1.25rem;
}

/* Estilos para enlaces externos */
.link--external {
  color: var(--neutral-textos-700);
  text-decoration: underline;
  margin: 0 0.3125rem;
}

.link--external:hover {
  color: var(--primario-500);
}

/* Estilos para la sección de contacto */
.footer__contact {
  text-align: right;
}

/* Estilos para enlaces internos */
.link--internal {
  color: var(--neutral-textos-700);
  text-decoration: none;
}

.link--internal:hover {
  text-decoration: underline;
  color: var(--primario-500);
}

/* Adaptaciones para móviles */
@media (max-width: 768px) {
  .footer__content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer__copyright {
    justify-content: center;
    margin-bottom: 1rem;
  }

  .footer__contact {
    text-align: center;
    width: 100%;
  }
}
</style>