import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from '@/services/UserService';

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User>({
    id: 161122593,
    username: 'Maxim',
    avatar: '',
    verified: true,
  });

  return {
    user,
  };
});
