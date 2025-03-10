import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    socialNetworks: null
  }),
  actions: {
    setProfile(profile) {
      this.profile = profile;
    },
    setSocialNetworks(socialNetworks) {
      this.socialNetworks = socialNetworks;
    }
  }
});