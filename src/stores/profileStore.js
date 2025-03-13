// Importamos la función defineStore de Pinia para crear nuestro store
import { defineStore } from 'pinia';

// Definimos nuestro store de perfil usando defineStore
// El primer argumento es el identificador único del store
export const useProfileStore = defineStore('profile', {
  // Definición del estado del store
  state: () => ({
    // Información básica del usuario (null por defecto)
    user: null,
    // Información del perfil del usuario (null por defecto)
    profile: null,
    // Redes sociales del usuario (null por defecto)
    socialNetworks: null,
    // Experiencia profesional del usuario (null por defecto)
    professionalExperience: null,
    // Educación del usuario (null por defecto)
    education: null,
    // Habilidades del usuario (null por defecto)
    skills: null,
    // Proyectos del usuario (null por defecto)
    projects: null
  }),
  // Definición de acciones (métodos) del store
  actions: {
    // Acción para establecer la información básica del usuario
    setUser(user) {
      this.user = user;
    },
    // Acción para establecer la información del perfil del usuario
    setProfile(profile) {
      this.profile = profile;
    },
    // Acción para establecer las redes sociales del usuario
    setSocialNetworks(socialNetworks) {
      this.socialNetworks = socialNetworks;
    },
    // Acción para establecer toda la experiencia profesional del usuario
    setProfessionalExperience(professionalExperience) {
      this.professionalExperience = professionalExperience;
    },
    // Acción para añadir una nueva experiencia profesional
    addProfessionalExperience(experience) {
      // Añadimos la nueva experiencia al array existente
      this.professionalExperience.push(experience);
    },
    // Acción para establecer toda la educación del usuario
    setEducation(education) {
      this.education = education;
    },
    // Acción para añadir un nuevo título educativo
    addEducation(degree) {
      // Añadimos el nuevo título al array existente
      this.education.push(degree);
    },
    // Acción para establecer todas las habilidades del usuario
    setSkills(skills) {
      this.skills = skills;
    },
    // Acción para añadir una nueva habilidad
    addSkill(skill) {
      // Añadimos la nueva habilidad al array existente
      this.skills.push(skill);
    },
    // Acción para establecer todos los proyectos del usuario
    setProjects(projects) {
      this.projects = projects;
    },
    // Acción para añadir un nuevo proyecto
    addProject(project) {
      // Añadimos el nuevo proyecto al array existente
      this.projects.push(project);
    }
  }
});