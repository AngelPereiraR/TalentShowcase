<template>
  <!-- Estructura principal de la aplicación -->
  <div id="app">
    <!-- Componente Header: Encabezado de la aplicación -->
    <Header />

    <!-- Contenido principal de la aplicación -->
    <main>
      <!-- Spinner de carga condicional: Solo se muestra cuando isLoading es verdadero -->
      <Spinner v-if="isLoading" />
      <!-- Punto de montaje para las vistas enrutadas -->
      <router-view />
    </main>

    <!-- Componente Footer: Pie de página de la aplicación -->
    <Footer />
  </div>
</template>

<script>
// Importación de componentes locales
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Spinner from './components/Spinner.vue';
// Importación de stores de Pinia para gestión de estado
import { useLoadingStore } from './stores/loadingStore';
import { useThemeStore } from './stores/themeStore';

export default {
  name: 'App',
  components: {
    // Registro de componentes locales
    Header,
    Footer,
    Spinner
  },
  computed: {
    // Propiedad computada para acceder al estado de carga desde el store
    isLoading() {
      return useLoadingStore().isLoading
    },
    // Propiedad computada para acceder al modo oscuro desde el store
    isDarkMode() {
      return useThemeStore().isDarkMode
    }
  },
  mounted() {
    // Ciclo de vida: Cuando el componente se monta, carga las preferencias de tema
    useThemeStore().loadThemePreference();
  }
}
</script>

<style>
:root {
  /* Variables CSS para colores y tipografías */
  /* Neutral / Textos */
  --neutral-textos-50: #FFFFFF;
  --neutral-textos-100: #F6F6F6;
  --neutral-textos-200: #CCCCCC;
  --neutral-textos-300: #B3B3B3;
  --neutral-textos-400: #999999;
  --neutral-textos-500: #808080;
  --neutral-textos-600: #666666;
  --neutral-textos-700: #4D4D4D;
  --neutral-textos-800: #333333;
  --neutral-textos-900: #191919;

  /* Primario */
  --primario-50: #cdd8e4;
  --primario-100: #9bb2c8;
  --primario-200: #6a8bad;
  --primario-300: #476582;
  --primario-400: #2C3E50;
  --primario-500: #263345;
  --primario-600: #1F2C39;
  --primario-700: #19232E;
  --primario-800: #131B22;
  --primario-900: #0D1217;

  /* Secundario */
  --secundario-50: #fbfcfc;
  --secundario-100: #f7f7f7;
  --secundario-200: #f4f4f4;
  --secundario-300: #f0f0f0;
  --secundario-400: #ECF0F1;
  --secundario-500: #C5D1D4;
  --secundario-600: #9eb2b7;
  --secundario-700: #76939a;
  --secundario-800: #577076;
  --secundario-900: #3a4a4e;

  /* Botones */
  --botones-50: #cbf8ef;
  --botones-100: #97f1df;
  --botones-200: #63e9cf;
  --botones-300: #2fe2bf;
  --botones-400: #1ABC9C;
  --botones-500: #16a186;
  --botones-600: #13866f;
  --botones-700: #0f6b59;
  --botones-800: #0b5143;
  --botones-900: #07362d;

  /* Hover */
  --hover-50: #d6eaf8;
  --hover-100: #aed6f1;
  --hover-200: #85c1e9;
  --hover-300: #5dade2;
  --hover-400: #3498DB;
  --hover-500: #2384c5;
  --hover-600: #1d6ea4;
  --hover-700: #175884;
  --hover-800: #114263;
  --hover-900: #0c2c42;

  /* Errors */
  --errors-50: #ffebee;
  --errors-100: #ffcdd2;
  --errors-200: #ef9a9a;
  --errors-300: #e57373;
  --errors-400: #ef5350;
  --errors-500: #f44336;
  --errors-600: #e53935;
  --errors-700: #d32f2f;
  --errors-800: #c62828;
  --errors-900: #b71c1c;

  /* Sombras */
  --sombras-50: #FFFFFF;
  --sombras-100: #333333;

  /* Tipografías */
  --font-family-title: 'Montserrat';
  --font-weight-title: bold;
  --font-size-title-desktop: 3.5rem;
  --font-size-title-mobile: 2.25rem;

  --font-family-menu: 'Montserrat';
  --font-weight-menu: medium;
  --font-size-menu-desktop: 3rem;
  --font-size-menu-mobile: 1.75rem;

  --font-family-subtitle: 'Montserrat';
  --font-weight-subtitle: semibold;
  --font-size-subtitle-desktop: 2.5rem;
  --font-size-subtitle-mobile: 1.5rem;

  --font-family-text-large: 'Open Sans';
  --font-weight-text-large: regular;
  --font-size-text-large: 1.25rem;

  --font-family-text-normal: 'Open Sans';
  --font-weight-text-normal: regular;
  --font-size-text-normal: 1rem;

  --font-family-text-small-mobile: 'Open Sans';
  --font-weight-text-small-mobile: regular;
  --font-size-text-small-mobile: 0.75rem;

  font-size: 16px;
}

/* Reset de estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Estilos base para el body */
body {
  font-family: var(--font-family-text-normal);
  font-weight: var(--font-weight-text-normal);
  font-size: var(--font-size-text-normal);
  line-height: 1.6;
  color: var(--neutral-textos-700);
}
</style>