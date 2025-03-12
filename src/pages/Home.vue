<template>
  <div>
    <section class="hero" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <h2 class="hero__title">Muestra tu talento al mundo</h2>
        <p class="hero__subtitle">Crea tu portafolio en línea de manera fácil y personalizada</p>
      </div>
    </section>

    <section class="about" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <h3 class="about__title">¿Qué es TalentShowcase?</h3>
        <p class="about__text">
          TalentShowcase es una plataforma diseñada para profesionales de
          diversos sectores que buscan destacar su experiencia y habilidades de
          manera visual y organizada.
        </p>
      </div>
    </section>

    <section class="portfolio-example" :class="{ 'dark-mode': isDarkMode }">
      <div class="container">
        <h3 class="portfolio-example__title">Ejemplo de portafolio</h3>
        <div class="portfolio-example__image">
          <img src="@/assets/portfolio-example.png" alt="Ejemplo de portafolio" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useThemeStore } from '../stores/themeStore';

export default {
  name: 'Home',
  computed: {
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 90%;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.hero {
  background: linear-gradient(to right, var(--hover-400), var(--hover-100));
  padding: 16rem 0 10rem;
  text-align: center;
  color: var(--neutral-textos-900);
}

.hero.dark-mode {
  background: var(--primario-900);
  color: var(--neutral-textos-200);
}

.hero.dark-mode button {
  background-color: var(--botones-900);
  color: var(--neutral-textos-100);
}

.hero.dark-mode button:hover {
  background-color: var(--botones-600);
}

.hero__title {
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-title-desktop);
  margin-bottom: 1.25rem;
}

.hero__subtitle {
  font-family: var(--font-family-text-large);
  font-weight: var(--font-weight-text-large);
  font-size: var(--font-size-text-large);
  margin-bottom: 1.875rem;
}

.about {
  padding: 7.5rem 0;
  text-align: center;
}

.about.dark-mode {
  background-color: var(--neutral-textos-700);
  color: var(--neutral-textos-200);
}

.about__title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  margin-bottom: 1.25rem;
}

.about__text {
  max-width: 43.75rem;
  margin: 0 auto;
  line-height: 1.8;
  font-size: var(--font-size-text-large);
}

.portfolio-example {
  background-color: var(--primario-100);
  padding: 7.5rem 0;
  text-align: center;
  color: var(--neutral-textos-900);
}

.portfolio-example.dark-mode {
  background-color: var(--primario-900);
  color: var(--neutral-textos-200);
}

.portfolio-example__title {
  font-family: var(--font-family-menu);
  font-weight: var(--font-weight-menu);
  font-size: var(--font-size-menu-desktop);
  margin-bottom: 3.75rem;
}

.portfolio-example__image {
  max-width: 37.5rem;
  margin: 0 auto;
}

.portfolio-example__image img {
  width: 100%;
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.2);
}

/* Media Queries for small screens */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .hero {
    padding: 12rem 0 6rem;
  }

  .hero__title {
    font-size: var(--font-size-title-mobile);
  }

  .hero__subtitle {
    font-size: var(--font-size-text-normal);
  }

  .about {
    padding: 5rem 0;
  }

  .about__title {
    font-size: var(--font-size-menu-mobile);
  }

  .about__text {
    max-width: 30rem;
    font-size: var(--font-size-text-normal);
  }

  .portfolio-example {
    padding: 5rem 0;
  }

  .portfolio-example__title {
    font-size: var(--font-size-menu-mobile);
  }

  .portfolio-example__image {
    max-width: 30rem;
  }
}
</style>