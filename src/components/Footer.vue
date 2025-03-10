<template>
  <footer class="footer" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="footer__content">
        <div class="footer__copyright">
          TalentShowcase © 2025 by Ángel Pereira is licensed under
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" class="link--external">CC
            BY-NC-ND 4.0</a>
        </div>
        <div class="footer__contact">
          <router-link :to="{ name: 'Contact' }" class="link--internal">Contacta con nosotros</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useThemeStore } from '../stores/themeStore';

export default {
  name: 'Footer',
  computed: {
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  }
}
</script>

<style scoped>
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

.footer__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  max-width: 90%;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.link--external {
  color: var(--neutral-textos-700);
  text-decoration: underline;
  margin: 0 0.3125rem;
}

.link--external:hover {
  color: var(--primario-500);
}

.footer__contact {
  text-align: right;
}

.link--internal {
  color: var(--neutral-textos-700);
  text-decoration: none;
}

.link--internal:hover {
  text-decoration: underline;
  color: var(--primario-500);
}

/* Media Query for Tablet */
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