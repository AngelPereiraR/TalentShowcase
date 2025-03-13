# TalentShowcase - Vue.js Portfolio Platform

## Descripción

TalentShowcase es una plataforma de portafolios profesionales construida con Vue 3 y Vite. Permite a los usuarios crear y personalizar perfiles detallados que incluyen información personal, experiencia profesional, educación, habilidades y proyectos destacados. La aplicación utiliza Pinia para la gestión del estado y Axios para las solicitudes HTTP.

## Características Principales

- **Autenticación de usuarios**: Registro, inicio de sesión y cierre de sesión
- **Perfiles personalizables**: Edición de información personal, experiencia profesional, educación, habilidades y proyectos
- **Modo oscuro**: Soporte para tema claro/oscuro con persistencia en localStorage
- **Responsive design**: Adaptación a diferentes tamaños de pantalla
- **Validación de formularios**: con mensajes de error claros
- **Gestión de estado**: con Pinia
- **Carga dinámica**: de componentes no críticos para mejorar el rendimiento

## Estructura del Proyecto

```plaintext
src/
├── assets/               # Archivos estáticos
├── components/           # Componentes reutilizables
├── pages/                # Páginas de la aplicación
├── router/               # Configuración del enrutador
├── stores/               # Stores de Pinia
├── App.vue               # Componente principal de la aplicación
├── main.js               # Punto de entrada de la aplicación
├── vite.config.js        # Configuración de Vite
```

## Instalación y Uso

### Pre-requisitos

- Node.js (v22 o superior)
- npm (v10 o superior)

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/AngelPereiraR/TalentShowcase.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias:

   ```env
   VITE_BACKEND_URL=http://localhost:8000/
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Accede a la aplicación en tu navegador en `http://localhost:5173`

### Nota Importante sobre el Servidor

**Importante:** El servidor backend utilizado en este proyecto se apaga automáticamente cuando detecta inactividad. Como resultado, la primera vez que intentes acceder a la aplicación o realizar una petición después de un período de inactividad, es posible que experimentes una espera de 1-2 minutos mientras el servidor se reinicia.

**Solución:** Si notas que la aplicación no responde inmediatamente, espera unos minutos y recarga la página (`Ctrl + R` o `Cmd + R`). Esto debería resolver el problema y permitir que las peticiones se realicen correctamente.

### Compilación para Producción

Para compilar la aplicación para producción:

```bash
npm run build
```

Los archivos compilados se encontrarán en la carpeta `dist/`.

### Acceso en Producción

La aplicación compilada está disponible públicamente en la siguiente URL:

https://talentshowcase-ampr.netlify.app/

Puedes acceder directamente a esta dirección para ver la versión en producción de TalentShowcase.

## Futuras Mejoras

### Características Propuestas

- **Soporte Multiidioma**: Implementación de internationalización (i18n) para permitir que la plataforma esté disponible en múltiples idiomas, mejorando así la accesibilidad para usuarios de diferentes países.

- **Personalización Visual del Portfolio**: Herramientas completas para la creación y customización integral del portfolio. Los usuarios podrán elegir entre diferentes plantillas, personalizar colores, fuentes, diseños y estructuras, permitiendo un control total sobre la apariencia y disposición de su portfolio, diferenciándose claramente de la personalización básica del perfil actual.

- **Página de Recomendaciones**: Una sección que muestre portfolios similares al del usuario actual, facilitando la búsqueda de inspiración y conexión con profesionales del mismo campo.

- **Chat en Tiempo Real**: Implementación de un sistema de mensajería instantánea que permita a los usuarios comunicarse directamente, mejorando así la interacción entre profesionales.

- **Panel de Administración**: Un apartado exclusivo para administradores donde puedan gestionar usuarios, portfolios y contenido de la plataforma, incluyendo herramientas para moderar contenido y analizar métricas.

- **Red Social Integrada**: Creación de un espacio donde los usuarios puedan publicar actualizaciones, compartir logros profesionales e interactuar con publicaciones de otros usuarios, fomentando así una comunidad activa.

- **Refactorización de la Maquetación y Accesibilidad**: Revisar y mejorar la estructura HTML y CSS para garantizar una mejor experiencia de usuario, cumplimiento de estándares web y accesibilidad para personas con discapacidades.

### Otras Mejoras Interesantes

- **Integración con Redes Sociales**: Permitir a los usuarios importar información directamente desde sus perfiles de LinkedIn u otras plataformas profesionales.

- **Sistema de Notificaciones**: Implementación de notificaciones push y por email para mantener a los usuarios informados sobre actividades relevantes en su perfil o en la plataforma.

- **Exportación de Perfil**: Opción para exportar el perfil como PDF o JSON, facilitando así la aplicación a trabajos o la migración a otras plataformas.

- **Sistema de Recomendaciones**: Permite a los contactos profesionales dejar recomendaciones visibles en el perfil de un usuario.

- **Integración con APIs de Trabajo**: Conexión con plataformas de búsqueda de empleo como LinkedIn Jobs o Indeed para que los usuarios puedan aplicar directamente desde su perfil.

- **Analítica de Perfil**: Herramientas para que los usuarios puedan ver estadísticas de visitas a su perfil y el rendimiento de sus proyectos.

## Licencia

Este proyecto está bajo la licencia [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

## Contacto

Si tienes alguna pregunta o comentario, por favor contáctame:

- Nombre: Ángel Pereira
- Email: aperrod2406@g.educaand.es

¡Gracias por usar TalentShowcase!
