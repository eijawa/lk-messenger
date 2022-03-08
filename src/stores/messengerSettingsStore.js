import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessengerSettingsStore = defineStore('messengerSettingsStore', {
  state: () => {
    const isChatOpened = ref(false);

    const user = ref({});

    return {
      isChatOpened,
      user,
    };
  },
});
