import { defineStore } from 'pinia';
import { ref } from 'vue';

import { generateChat } from '@/services/mocks/chatsMock';

import config from '@/config';

import { ChatsService, Chats } from '@/services/ChatsService';
import { User } from '@/services/UserService';

const chatsService = new ChatsService();

export const useMessengerSettingsStore = defineStore('chatsStore', () => {
  const chats = ref<Chats>([]);

  const getChats = async () => {
    if (!config.isUseMockedData) {
      chats.value = await chatsService.getChats();
    } else {
      const user: User = {
        id: 161122593,
        username: 'Maxim',
        avatar: '',
        verified: true,
      };
      const arrayLoops = Array.from({ length: 20 }, (v, k) => k);
      await arrayLoops.reduce(async (promise, i) => {
        await promise;
        const chat = await generateChat(i, user);
        chats.value.push(chat);
      }, Promise.resolve());
    }
  };

  return {
    chats,
    getChats,
  };
});
