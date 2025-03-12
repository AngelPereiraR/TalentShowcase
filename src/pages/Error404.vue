<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="error-code" :class="{ bounce: animate }">404</h1>
      <h2 class="error-message">Página no encontrada</h2>
      <button class="back-button" @click="goBackHome">
        Volver al inicio
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      animate: false
    };
  },
  mounted() {
    // Iniciar la animación después de que el componente esté montado
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      // Activar la animación
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
  background-color: #ffffff;
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

.error-message {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.back-button {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #27ae60;
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
    font-size: 6rem;
  }

  .error-message {
    font-size: 1.2rem;
  }

  .back-button {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>