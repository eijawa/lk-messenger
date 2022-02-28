import { defineStore } from 'pinia';
import { ref } from 'vue';

import { UserService } from '@/services/UserService';

const userService = new UserService();

export const useMessengerSettingsStore = defineStore('messengerSettingsStore', {
  state: () => {
    const isChatOpened = ref(false);

    const user = ref({});

    return {
      isChatOpened,
      user,
    };
  },
  actions: {
    async fetchUserInfo() {
      if (this.user === null || this.user === undefined) {
        const userData = await userService.getUserInfo();
        this.user = userData.result;
      }
    },
  },
});
