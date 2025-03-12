import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    user: null,
    profile: null,
    socialNetworks: null,
    professionalExperience: null
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
  }
});