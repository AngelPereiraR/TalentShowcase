import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    user: null,
    profile: null,
    socialNetworks: null,
    professionalExperience: null,
    education: null,
    skills: null,
    projects: null
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setProfile(profile) {
      this.profile = profile;
    },
    setSocialNetworks(socialNetworks) {
      this.socialNetworks = socialNetworks;
    },
    setProfessionalExperience(professionalExperience) {
      this.professionalExperience = professionalExperience;
    },
    addProfessionalExperience(experience) {
      this.professionalExperience.push(experience);
    },
    setEducation(education) {
      this.education = education;
    },
    addEducation(degree) {
      this.education.push(degree);
    },
    setSkills(skills) {
      this.skills = skills;
    },
    addSkill(skill) {
      this.skills.push(skill);
    },
    setProjects(projects) {
      this.projects = projects;
    },
    addProject(project) {
      this.projects.push(project);
    }
  }
});