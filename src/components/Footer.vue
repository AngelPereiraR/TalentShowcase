<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          TalentShowcase © 2025 by Ángel Pereira is licensed under
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">CC BY-NC-ND 4.0</a>
        </div>
        <div class="contact">
          <a href="#">Contacta con nosotros</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  font-size: 14px;
  color: #666;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  display: flex;
  align-items: center;
}

.copyright a {
  color: #666;
  text-decoration: underline;
  margin: 0 5px;
}

.contact a {
  color: #666;
  text-decoration: none;
}

.contact a:hover {
  text-decoration: underline;
}
</style>