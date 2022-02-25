import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessengerLayoutStore = defineStore('messengerLayoutStore', () => {
  const isChatOpened = ref(false);

  return {
    isChatOpened,
  };
});
