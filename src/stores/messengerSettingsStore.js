import { defineStore } from 'pinia';
import { ref } from 'vue';

import { UserService } from '@/services/UserService';

import { setCSSVariable, getCSSVariable } from '../helpers/cssVariablesHelper';

const userService = new UserService();

export const useMessengerSettingsStore = defineStore('messengerSettingsStore', {
  state: () => {
    const isChatOpened = ref(false);

    const user = ref({});

    const userUColor = ref(null);
    const userUColorLight = ref(null);

    return {
      isChatOpened,
      user,
      userUColor,
      userUColorLight,
    };
  },
  actions: {
    async fetchUserInfo() {
      if (this.user.value === undefined) {
        const userData = await userService.getUserInfo();
        this.user = userData.result;

        // REMOVE
        this.user.university = 'pht';

        this.userUColor = getCSSVariable(`--volsu-u-${this.user.university}`);
        this.userUColorLight = getCSSVariable(`--volsu-u-${this.user.university}-light`);

        if (!localStorage.getItem('isDefaultMessageStyle')) {
          this.setUniversityMessageStyle();
        }

        this.setUniversityMessengerStyle(this.user.university);
      }
    },
    setUniversityMessengerStyle(university) {
      setCSSVariable('--color-focus', this.userUColorLight);

      if (university === 'mait') {
        const uColorBlack = getCSSVariable('--color-black');

        setCSSVariable('--color-text-focus', uColorBlack);
      }
    },
    setUniversityMessageStyle() {
      setCSSVariable('--color-message', this.userUColor);
    },
  },
});
