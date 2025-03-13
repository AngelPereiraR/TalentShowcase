<template>
  <!-- Fondo transparente del modal -->
  <div class="modal-overlay" @click.self="closeModal">
    <!-- Contenido del modal -->
    <div class="modal">
      <div class="modal-content">
        <!-- Título del modal -->
        <h3 class="modal-title">{{ title }}</h3>
        <!-- Mensaje del modal -->
        <p class="modal-message">{{ message }}</p>
        <!-- Botón para cerrar el modal -->
        <button class="modal-button" @click="closeModal">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    // Título del modal, con valor predeterminado 'Error'
    title: {
      type: String,
      default: 'Error'
    },
    // Mensaje del modal, requerido
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    // Método para cerrar el modal
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
/* Fondo transparente del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Contenedor principal del modal */
.modal {
  background-color: white;
  padding: 2rem;
  border-radius: 0.625rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(var(--sombras-100), 0.1);
  width: 90%;
  max-width: 40rem;
}

/* Contenido del modal */
.modal-content {
  text-align: center;
}

/* Título del modal */
.modal-title {
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-title-desktop);
  color: var(--neutral-textos-900);
  margin-bottom: 1rem;
}

/* Mensaje del modal */
.modal-message {
  font-family: var(--font-family-text-normal);
  font-size: var(--font-size-text-normal);
  color: var(--neutral-textos-700);
  margin-bottom: 1.5rem;
}

/* Botón de aceptación */
.modal-button {
  background-color: var(--botones-400);
  color: var(--neutral-textos-50);
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Efecto hover en el botón */
.modal-button:hover {
  background-color: var(--botones-500);
}
</style>