import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessengerSettingsStore = defineStore('messengerSettingsStore', () => {
  const token = ref('');

  const isChatOpened = ref(false);

  return {
    isChatOpened,
    token,
  };
});
