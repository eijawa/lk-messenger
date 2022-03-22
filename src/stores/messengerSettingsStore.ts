import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessengerSettingsStore = defineStore('messengerSettingsStore', () => {
  const isChatOpened = ref<boolean>(false);

  return {
    isChatOpened,
  };
});
