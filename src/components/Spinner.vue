<template>
  <!-- Contenedor principal del spinner de carga -->
  <div class="spinner-container">
    <!-- Spinner circular -->
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
/* Estilos para el contenedor del spinner */
.spinner-container {
  /* Posicionado fijo para cubrir toda la pantalla */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Fondo semitransparente */
  background-color: rgba(255, 255, 255, 0.8);
  /* Centrado del spinner */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Índice de apilado superior para que cubra todo el contenido */
  z-index: 9999;
}

/* Estilos para el spinner */
.spinner {
  /* Tamaño del spinner */
  width: 50px;
  height: 50px;
  /* Borde del spinner */
  border: 5px solid rgba(0, 0, 0, 0.1);
  /* Forma circular */
  border-radius: 50%;
  /* Color del borde superior (parte animada) */
  border-top-color: var(--primario-500);
  /* Animación de rotación continua */
  animation: spin 1s ease-in-out infinite;
}

/* Definición de la animación de rotación */
@keyframes spin {

  /* En el final de la animación, girar 360 grados */
  to {
    transform: rotate(360deg);
  }
}
</style>