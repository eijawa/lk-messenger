import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('useStore', {
  state: () => {
    const user = ref({
      id: 161122593,
      username: 'Maxim Mostovoy',
      verified: true,
    });

    return {
      user,
    };
  },
});
