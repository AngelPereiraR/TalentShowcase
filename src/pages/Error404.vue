<template>
  <div class="not-found-container" :class="{ 'dark-mode': isDarkMode }">
    <div class="not-found-content">
      <h1 class="error-code" :class="{ bounce: animate, 'dark-mode': isDarkMode }">404</h1>
      <h2 class="error-message" :class="{ 'dark-mode': isDarkMode }">Página no encontrada</h2>
      <button class="back-button" @click="goBackHome">
        Volver al inicio
      </button>
    </div>
  </div>
</template>

<script>
import { useThemeStore } from '../stores/themeStore';

export default {
  name: "NotFound",
  data() {
    return {
      animate: false
    };
  },
  computed: {
    isDarkMode() {
      return useThemeStore().isDarkMode;
    }
  },
  mounted() {
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      this.animate = true;
    },
    goBackHome() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--neutral-textos-100);
}

.not-found-container.dark-mode {
  background-color: var(--primario-900);
}

.not-found-content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-family: var(--font-family-title);
  font-size: var(--font-size-title-desktop);
  font-weight: var(--font-weight-title);
  color: var(--primario-400);
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

.error-code.dark-mode {
  color: var(--hover-300);
}

.error-message {
  font-family: var(--font-family-subtitle);
  font-size: var(--font-size-subtitle-desktop);
  font-weight: var(--font-weight-subtitle);
  color: var(--neutral-textos-800);
  margin-bottom: 2rem;
}

.error-message.dark-mode {
  color: var(--neutral-textos-200);
}

.back-button {
  background-color: var(--botones-400);
  color: var(--neutral-textos-50);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-family: var(--font-family-text-normal);
  font-size: var(--font-size-text-normal);
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button.dark-mode {
  background-color: var(--botones-500);
}

.back-button:hover {
  background-color: var(--botones-500);
}

.back-button.dark-mode:hover {
  background-color: var(--botones-600);
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20px);
  }

  60% {
    transform: translateY(-10px);
  }
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .error-code {
    font-size: var(--font-size-title-mobile);
  }

  .error-message {
    font-size: var(--font-size-subtitle-mobile);
  }

  .back-button {
    padding: 0.6rem 1.5rem;
    font-size: var(--font-size-text-small-mobile);
  }
}
</style>