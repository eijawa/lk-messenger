import { defineStore } from 'pinia';
import { ref } from 'vue';

import { UserService } from '@/services/UserService';

import { setCSSVariable, getCSSVariable } from '../helpers/cssVariablesHelper';

const userService = new UserService();

const setUniversityMessageStyle = university => {
  const uMessageColor = getCSSVariable(`--volsu-u-${university}`);

  setCSSVariable('--color-message', uMessageColor);
};

const setUniversityMessengerStyle = university => {
  const uColorLight = getCSSVariable(`--volsu-u-${university}-light`);

  setCSSVariable('--color-focus', uColorLight);

  if (university === 'mait') {
    const uColorBlack = getCSSVariable('--color-black');

    setCSSVariable('--color-text-focus', uColorBlack);
  }
};

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
      if (this.user.value === undefined) {
        const userData = await userService.getUserInfo();
        this.user = userData.result;

        // REMOVE
        this.user.university = 'mait';

        if (!localStorage.getItem('isDefaultMessageStyle')) {
          setUniversityMessageStyle(this.user.university);
        }

        setUniversityMessengerStyle(this.user.university);
      }
    },
  },
});
