<template>
  <div id="app">
    <Header />

    <main>
      <section class="hero">
        <div class="container">
          <h2 class="hero-title">Muestra tu talento al mundo</h2>
          <p class="hero-subtitle">Crea tu portafolio en línea de manera fácil y personalizada</p>
          <button class="btn-portfolio">Crear portafolio</button>
        </div>
      </section>

      <section class="about">
        <div class="container">
          <h3>¿Qué es TalentShowcase?</h3>
          <p>
            TalentShowcase es una plataforma diseñada para profesionales de
            diversos sectores que buscan destacar su experiencia y habilidades de
            manera visual y organizada.
          </p>
        </div>
      </section>

      <section class="portfolio-example">
        <div class="container">
          <h3>Ejemplo de portafolio</h3>
          <div class="portfolio-image">
            <!-- Aquí iría la imagen del portafolio de ejemplo -->
            <img src="@/assets/portfolio-example.png" alt="Ejemplo de portafolio" />
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background-color: #87CEEB;
  padding: 80px 0;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 18px;
  margin-bottom: 30px;
}

.btn-portfolio {
  background-color: #8DF5AD;
  color: #333;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-portfolio:hover {
  background-color: #7AE59C;
}

.about {
  padding: 60px 0;
  text-align: center;
}

.about h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.about p {
  margin: 0 auto;
  line-height: 1.8;
}

.portfolio-example {
  background-color: #B3C7D9;
  padding: 60px 0;
  text-align: center;
}

.portfolio-example h3 {
  font-size: 24px;
  margin-bottom: 30px;
  color: white;
}

.portfolio-image {
  max-width: 600px;
  margin: 0 auto;
}

.portfolio-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>